import './dashboard.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import MovieCard from '../../components/movies/MovieCard';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState("");
    const [sort, setSort] = useState("");
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        function loadMovies(page) {
            const accessToken = localStorage.getItem('accessToken');
            const headers = {authorization: `Bearer ${accessToken}`};
            const params = { minYear, maxYear, genres, title, sort, page };
            axios.get("http://localhost:8000/api/titles/advancedsearch", { headers, params })
            .then((res) => setMovies(res.data.titles));
        }
    
        loadMovies(page);
    }, [minYear, maxYear, genres, sort, title, page]);

    return (
        <div className='homepage'>
            <Filter minYear={minYear === "" ? minYear: parseInt(minYear)}
            setMinYear={setMinYear}
            maxYear={maxYear === "" ? maxYear : parseInt(maxYear)}
            setMaxYear={setMaxYear}
            sort={sort}
            setSort={setSort}
            genres={genres}
            setGenres={setGenres}
            title={title}
            setTitle={setTitle}/>

            <ul className={'movies-list'}>
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </ul>
            
            <Button text='Load more..'
            type='button'
            className='btn hover'
            onClick={() => setPage(page + 1)}/>
        </div>
    );
}
