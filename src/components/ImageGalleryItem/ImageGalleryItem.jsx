import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.image;
    const { showModal } = this.state;

    return (
      <li className="ImageGalleryItem" onClick={this.toggleModal}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        {showModal && (
          <Modal image={largeImageURL} tags={tags} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
