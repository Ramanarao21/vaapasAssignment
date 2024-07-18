import React, { useState } from 'react';
import MovieCard from './components/MovieCard/MovieCard';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [movies, setMovies] = useState([]);

  const handleSearchResults = (results) => {
    setMovies(results.map((movie, index) => ({ ...movie, key: index })));
  };

  return (
    <div className='app'>
      <SearchBar onSearchResults={handleSearchResults} />
      <MovieCard movies={movies} />
    </div>
  );
};

export default App;
