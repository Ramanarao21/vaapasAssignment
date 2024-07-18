import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a Movie');
      return;
    }
    setLoading(true);
    setNoResults(false);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm}`);
      const data = await response.json();
      const filteredMovies = data.docs.filter(movie => movie.title);
      if (filteredMovies.length === 0) {
        setNoResults(true);
        onSearchResults([]); 

      } else {
        // setNoResults(false);
        onSearchResults(data.docs);
      }
      setSearchTerm("");
    } catch (error) {
      console.error("Failed to fetch products", error);
      alert('Failed to fetch products');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='movies-search'>
      <h1 className='heading'>Discover Movies</h1>
      <div className='searchBar'>
        <div className="wrap-input-8">
          <input className="input" type="search" placeholder="Search Movie or Title" value={searchTerm}
            onChange={handleInputChange} />
          <span className="focus-border">
            <i></i>
          </span>
        </div>
        <button onClick={handleSearch} className='searchBar-button' type='search' required="true">Search</button>
      </div>

      <div>
        {loading && <div className="spinner-container">
          <div className="spinner"></div> </div>
        }

        {noResults && (
          <div className="no-results-message">
            No Movies Found!!
          </div>
        )}
      </div>
    </div>
  );
};


export default SearchBar