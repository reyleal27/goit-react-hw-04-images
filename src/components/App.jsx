import SearchBar from './SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import { getAPI } from 'pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Notiflix from 'notiflix';


const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEnd, setIsEnd] = useState(null);

  useEffect(() => {
    if (searchQuery === '') return;
    const fetchImages = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await getAPI(searchQuery, currentPage);
        const { totalHits, hits } = response;

        setImages(prevImages =>
          currentPage === 1 ? hits : [...prevImages, ...hits]
        );
        setIsLoading(false);

        console.log(`hits ${hits.length}`);
        console.log(`totalHits ${totalHits}`);

        if (hits.length === 0) {
          Notiflix.Notify.warning('No images found. Try a different search.', {
            position: 'center-top',
          });
          return;
        }
        if (currentPage * 12 >= totalHits) {
          setIsEnd(true);
          Notiflix.Notify.warning(
            'You have reached the end of the search results'
          );
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        Notiflix.Notify.failure(
          `An error occured while fetching data: ${error}`
        );
      }
    };
    fetchImages();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCurrentQuery = searchQuery.toLowerCase();

    if (normalizedQuery === '') {
      Notiflix.Notify.failure(
        `Empty string is not a valid search query. Please type again.`
      );
      return;
    }
    if (normalizedQuery === normalizedCurrentQuery) {
      Notiflix.Notify.failure(
        `Search query is the same as the previous one. Please provide a new search query.`,
        {
          position: 'center-top',
        }
      );

      return;
    }

    if (normalizedQuery !== normalizedCurrentQuery) {
      setSearchQuery(normalizedQuery);
      setPage(1);
      setImages([]);
      setIsEnd(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isLoading && !isError && images.length > 0 && !isEnd && (
        <Button onClick={handleLoadMore} />
      )}
      {isError && <p>Something went wrong. Please try again later</p>}
    </div>
  );
};

export default App;
