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
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // console.log(searchTerm);

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
  // updated: Initial and search
  // now it will render everytime a search term is entered
  useEffect(() => {
    // to wipeout old state before we do a new search
    setState(initialState);
    // update: to enable search 
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};