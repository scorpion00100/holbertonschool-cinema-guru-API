import './dashboard.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/movies/MovieCard';

export default function WatchLater() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {authorization: `Bearer ${accessToken}`};

        axios.get("http://localhost:8000/api/titles/watchlater/", { headers })
        .then((res) => setMovies(res.data));
    
    }, []);

    return (
        <div className='watchlater'>
            <h1 className='main-title'>Movies to watch later</h1>
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
