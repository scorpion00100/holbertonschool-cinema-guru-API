import './movies.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import unavailable from '../../assets/unavailable.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty, faClock as faClockEmpty } from '@fortawesome/free-regular-svg-icons';

export default function MovieCard(props) {
    const { movie } = props;

    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const bgImg = {backgroundImage: isImageLoaded ? `url(${movie.imageurls[0]})` : `url(${unavailable})`}

    useEffect(() => {
        const image = new Image();
        image.src = movie.imageurls[0];
        image.onload = () => setIsImageLoaded(true);
        image.onerror = () => setIsImageLoaded(false);
        const accessToken = localStorage.getItem('accessToken');
        const headers = {authorization: `Bearer ${accessToken}`}

        axios.get("http://localhost:8000/api/titles/favorite", { headers })
        .then((res) => {
            if (res.data.find((m) => m.id === movie.id)) setIsFavorite(true);
        });

        axios.get("http://localhost:8000/api/titles/watchlater", { headers })
        .then((res) => {
            if (res.data.find((m) => m.id === movie.id)) setIsWatchLater(true);
        });
    }, [movie.id, movie.imageurls]);

    function handleClick(type, method) {
        const accessToken = localStorage.getItem('accessToken');
        const headers = {authorization: `Bearer ${accessToken}`}
        if (method) {
            axios.post(`http://localhost:8000/api/titles/${type}/${movie.imdbId}`, {}, { headers })
            .then(() => {
                if (type === 'favorite') setIsFavorite(!isFavorite);
                else if (type === 'watchlater') setIsWatchLater(!isWatchLater);
            });
        } else {
            axios.delete(`http://localhost:8000/api/titles/${type}/${movie.imdbId}`, { headers })
            .then(() => {
                if (type === 'favorite') setIsFavorite(!isFavorite);
                else if (type === 'watchlater') setIsWatchLater(!isWatchLater);
            });
        }
    }

    return (
        <li className='movie-card'>
            <div className='image-title' style={bgImg}>
                <div className='icons'>
                    <FontAwesomeIcon
                    className='icon'
                    icon={isWatchLater ? faClock : faClockEmpty}
                    onClick={() => handleClick('watchlater', !isWatchLater)}/>
                    <FontAwesomeIcon
                    className='icon'
                    icon={isFavorite ? faStar : faStarEmpty}
                    onClick={() => handleClick('favorite', !isFavorite)}/>
                </div>
                
                <p className='movie-title'>{movie.title}</p>
            </div>
            <div className='synopsis'>
                <p className='movie-synopsis'>{movie.synopsis ? movie.synopsis : 'No synopsis available...'}</p>
            </div>
            <ul className='movie-genres'>
                {movie.genres.map((genre) => <li className='movie-genre tag selected' key={genre}>{genre}</li>)}
            </ul>
        </li>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.object
}

MovieCard.defaultProps = {
    movie: null
}
