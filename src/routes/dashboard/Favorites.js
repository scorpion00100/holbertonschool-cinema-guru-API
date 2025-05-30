import './dashboard.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/movies/MovieCard';

export default function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {authorization: `Bearer ${accessToken}`};

        axios.get("http://localhost:8000/api/titles/favorite/", { headers })
        .then((res) => setMovies(res.data));
    
    }, []);

    return (
        <div className='favorites'>
            <h1 className='main-title'>Movies you like</h1>
            <ul className={'movies-list'}>
            {movies.length > 0 ?
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} />) :
                (<div>
                   <img src='https://i.gifer.com/VK11.gif' alt='titanic' />
                    <p>Nothing here... ;)</p> 
                </div>
                )}
            </ul>
        </div>
    );
}
