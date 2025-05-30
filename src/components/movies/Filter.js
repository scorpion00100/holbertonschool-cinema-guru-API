import './movies.css';
import Tag from './Tag';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../general/Input';
import SearchBar from '../general/SearchBar';
import SelectInput from '../general/SelectInput';

const options = [
    { value: '', text: "Default"},
    { value: 'latest', text: 'Latest' },
    { value: 'oldest', text: 'Oldest' },
    { value: 'highestrated', text: 'Highest rated' },
    { value: 'lowestrated', text: 'Lowest rated' },
];

const tags = ['Action','Drama', 'Comedy', 'Biography', 'Romance', 'Thriller',
    'War', 'History', 'Sport', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy', ];

export default function Filter(props) {
    const {
        minYear,
        setMinYear,
        maxYear,
        setMaxYear,
        sort,
        setSort,
        genres,
        setGenres,
        title,
        setTitle
    } = props;

    return (
        <div className='filter'>
            <div className='left-part'>
                <div className='search'>
                    <SearchBar title={title} setTitle={setTitle}/>
                </div>
                <div className='inputs'>
                   <Input
                    label='Min Date:'
                    type='number'
                    className='form-group dark'
                    value={minYear}
                    setValue={setMinYear}/>

                    <Input
                    label='Max Date:'
                    type='number'
                    className='form-group dark'
                    value={maxYear}
                    setValue={setMaxYear}/>

                    <SelectInput
                    label='Sort:'
                    options={options}
                    Multiple={false}
                    className='select-group'
                    value={sort}
                    setValue={setSort}/> 
                </div>
            </div>
            
            <div className='right-part'>
                <ul className='tags'>
                    {tags.map((genre) => <Tag key={genre} genre={genre} genres={genres.split(',')} setGenres={setGenres} filter={true}/>)}
                </ul>
            </div>
            
        </div>
    );
}

Filter.propTypes = {
    minYear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    setMinYear: PropTypes.func,
    maxYear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    setMaxYear: PropTypes.func,
    sort: PropTypes.string,
    setSort: PropTypes.func,
    genres: PropTypes.string,
    setGenres: PropTypes.func,
    title: PropTypes.string,
    setTitle: PropTypes.func
}

Filter.defaultProps = {
    minYear: 0,
    setMinYear: () => {},
    maxYear: 0,
    setMaxYear: () => {},
    sort: '',
    setSort: () => {},
    genres: '',
    setGenres: () => {},
    title: '',
    setTitle: () => {}
}
