import React from 'react';
// to get the url params we need a hook
import { useParams } from 'react-router-dom';

// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';

// Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
  const { movieId } = useParams();
  // example to show how to rename a property when structure-out
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;
  // console.log(movie);

  return (
    // react-fragment
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
    </>
  );
};

export default Movie;