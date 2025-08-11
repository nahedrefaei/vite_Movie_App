// MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './contexts/FavoritesContext';
const MovieCard = ({ movie }) => {
    const { title, poster_path, release_date, overview } = movie;
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const { favorites, toggleFavorite } = useFavorites();

    const isFavorite = favorites.includes(movie);
  
    return (
      <Link to={`/movie/${movie.id}`}>
        <div style={styles.card}>
          <img
            src={`${imageBaseUrl}${poster_path}`}
            alt={title}
            style={styles.poster}
          />
          <div style={styles.details}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.date}>{release_date}</p>
            <p style={styles.overview}>
              {overview.length > 100 ? `${overview.substring(0, 100)}...` : overview}
            </p>
          </div>
       <Link to={`/favorites/${movie.id}`}>   <button onClick={() => toggleFavorite(movie.id)} style={styles.button}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button></Link>
        </div>
      </Link>
    );
  };
  

const styles = {
  card: {
    width: '250px',
    height: '500px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    margin: '10px',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  poster: {
    width: '100%',
    height: '300px',
    objectFit: 'cover'
  },
  details: {
    padding: '10px'
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 5px'
  },
  date: {
    fontSize: '0.9rem',
    color: '#777'
  },
  overview: {
    fontSize: '0.85rem',
    color: '#555'
  }
};

export default MovieCard;
