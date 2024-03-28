import SearchBar from './SearchBar/SearchBar';
import React, { Component } from 'react';
import { getAPI } from 'pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    isError: false,
    isEnd: false,
  };

  async componentDidUpdate(_prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true, isError: false });

    const { searchQuery, currentPage } = this.state;

    try {
      const response = await getAPI(searchQuery, currentPage);
      console.log(response);
      const { totalHits, hits } = response;

      this.setState(prevState => ({
        images: currentPage === 1 ? hits : [...prevState.images, ...hits],
        isLoading: false,
        isEnd: prevState.images.length + hits.length >= totalHits,
      }));
      if (hits.length === 0) {
        Notiflix.Notify.warning('No images found. Try a different search.', {
          position: 'center-top'
        });
        return;
      }
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
      Notiflix.Notify.failure(`An error occured while fetching data: ${error}`);
    }
  };

  handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCurrentQuery = this.state.searchQuery.toLowerCase();

    if (normalizedQuery === '') {
      Notiflix.Notify.failure(
        `Empty string is not a valid search query. Please type again.`
      );
      return;
    }
    if (normalizedQuery === normalizedCurrentQuery) {
      Notiflix.Notify.failure(
        `Search query is the same as the previous one. Please provide a new search query.`, {
          position: 'center-top'
        }
      );

      return;
    }

    if (normalizedQuery !== normalizedCurrentQuery) {
      this.setState({
        searchQuery: normalizedQuery,
        currentPage: 1,
        images: [],
        isEnd: false,
      });
    }

    console.log(`normalizedCurrent: ${normalizedCurrentQuery}`);
    console.log(normalizedQuery);
    console.log(this.state.images);
  };

  handleLoadMore = () => {
    if (!this.state.isEnd) {
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    } else {
      Notiflix.Notify.warning('You have reached the end of the search results');
    }
  };

  render() {
    const { images, isLoading, isError, isEnd } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && !isError && images.length > 0 && !isEnd && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isError && <p>Something went wrong. Please try again later</p>}
      </div>
    );
  }
}

export default App;
