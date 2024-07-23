import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './nowShowing.css';

const NowShowing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/movies')
      .then(response => {
        console.log('API response:', response.data); // Log the response
        if (response.status === 200) {
          let responseData = response.data;
  
          // Ensure responseData is an array
          if (!Array.isArray(responseData)) {
            responseData = [responseData];
          }
  
          // Sort by date descending
          const sortedMovies = responseData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  
          setMovies(sortedMovies);
        } else {
          console.error('No movies found:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the movies!', error);
      });
  }, []);

  return (
    <section className='now-showing'>
      <h2>Now Showing</h2>
      <div className='now-showing-container'>
        {movies.map((movie, index) => (
          <div key={index} className={`movie-card animate__animated ${index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`}>
            {movie.picture ? (
            <img src={`http://127.0.0.1:8000/images/${movie.picture}`} alt={movie.title} />
          ) : null}
            <div className='movie-info'>
              <h3>{movie.title}</h3>
              <p>{movie.genre} - {movie.director}</p>
              <p>Duration: {movie.duration} minutes</p>
              <p>Price: ${movie.price}</p>
              <p>Stream: <a href={movie.stream_link} target="_blank" rel="noopener noreferrer">{movie.stream_link}</a></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NowShowing;
