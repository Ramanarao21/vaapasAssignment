import React, { useState, useEffect } from 'react';
import './MovieCard.css'

const MovieCard = ({ movies }) => {
  const [dogImages, setDogImages] = useState({});
  const [loadingImages, setLoadingImages] = useState(true);
  useEffect(() => {
    const fetchDogImages = async () => {
      setLoadingImages(true); 

      try {
        const dogImagePromises = movies.map(async (movie) => {
          const response = await fetch('https://dog.ceo/api/breeds/image/random');
          const data = await response.json();
          return { key: movie.key, imageUrl: data.message };
        });

        const images = await Promise.all(dogImagePromises);
        const dogImageMap = images.reduce((acc, { key, imageUrl }) => {
          acc[key] = imageUrl;
          return acc;
        }, {});
        setDogImages(dogImageMap);
      } catch (error) {
        console.error("Failed to fetch dog images", error);
        alert('Failed to fetch dog images');
      } finally {
        setLoadingImages(false); 
      }
    };

    fetchDogImages();
  }, [movies]);

  const formatTitle = (title) => {
    return title.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
  };

  return (
    <div className="movie-cards-con">
      {movies.map((movie) => (
        <div key={movie.key} className="movie-card">
          <h3 className='movie-name'>{formatTitle(movie.title)}</h3>
          <p className='movie-author'>-{movie.author_name ? movie.author_name.join(', ') : 'No Author'}</p>
          {loadingImages ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            dogImages[movie.key] && <img src={dogImages[movie.key]} alt="Dog" className='dog-img'/>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
