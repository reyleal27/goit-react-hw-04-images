import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import React, { Component } from "react";
import PropTypes from 'prop-types';


class ImageGallery extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
            })
        ).isRequired,
    };

    render() {
        const { images } = this.props;
        return (
            <ul className="ImageGallery">
                {images.map(image => (
                    <ImageGalleryItem key={image.id} image={image} />
                ))}
            </ul>
        );
    }
}
export default ImageGallery;