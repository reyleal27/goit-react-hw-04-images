import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useToggle } from 'components/Modal/toggle';

const ImageGalleryItem = ({ image }) => {
const { isOpen, toggle } = useToggle();
 
  const { webformatURL, largeImageURL, tags } = image;

  
  return (
    <li className="ImageGalleryItem" onClick={toggle}>
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
     
      {isOpen && <Modal image={largeImageURL} tags={tags} />}
    
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};

export default ImageGalleryItem;
