import React from "react";
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
    return (
        <button className="Button" onClick= {onClick}>Load More</button>
    )
}
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}


export default Button;