import { useState, useEffect } from 'react';
// API
import API from '../API';


const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

export const useHomeFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(false);

      const movies = await API.fetchMovies(searchTerm, page);

      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [...prev.movies, ...movies.results] : [...movies.results]
      }));
    } catch (error) {
      setError(true);
    }
  };

  // Initial render
  // parameter for useEffect()
  // 1- inline function and 
  // 2- dependency array to specify different dependencies on when this useEffect to trigger 
  // with empty dependency array useEffect will run once
  useEffect(() => {
    fetchMovies(1);
  }, []);

  return { state, loading, error };
  // return <div>H</div>

};