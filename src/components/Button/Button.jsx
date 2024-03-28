import React, { Component } from "react";
import PropTypes from 'prop-types';

class Button extends Component{
    static propTypes = {
        onClick: PropTypes.func.isRequired,
    };

    render() {
        return (
            <button className="Button" onClick= {this.props.onClick}>Load More</button>
        )
    }
}
export default Button;