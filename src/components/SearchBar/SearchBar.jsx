import { FiSearch } from "react-icons/fi";
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = { query: '' };
    handleChange = e => {
        this.setState({ query: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }
    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="button-label"><FiSearch /></span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.query}
                    />
                </form>
            </header>
        );
    };
}


export default SearchBar;