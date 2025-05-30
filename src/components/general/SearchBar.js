import './general.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(props) {
    const { title, setTitle } = props;

    function handleInput(e) {
        setTitle(e.target.value);
    }

    return (
        <input
        className='search-bar'
        type='search'
        placeholder='Search movies'
        value={title}
        onChange={handleInput}/>
    );
}

SearchBar.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func
}

SearchBar.defaultProps = {
    title: "",
    setTitle:() => {}
}
