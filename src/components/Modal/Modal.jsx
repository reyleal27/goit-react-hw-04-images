import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ image, tags}) => {


  return (
   <div className="Overlay">
        <div className="Modal">
          <img src={image} alt={tags}  />
        </div>
      </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default Modal;
