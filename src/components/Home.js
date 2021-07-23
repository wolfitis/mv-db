// It is a container component so we don't have a separate folder
import React from 'react';
// API
import API from '../API';
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';


// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';
import SearchBar from './SearchBar';

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm } = useHomeFetch();

  return (
    <>
      {/* {state.results[0] ? ( */}
      {/* if we dont want to update Hero image based on search results, otherwise uncomment above line and comment out below one */}
      {!searchTerm && state.results[0] ? (
        <HeroImage
          // below values are coming from TMDB
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map(movie => (
          <Thumb key={movie.id} clickable image={
            movie.poster_path
              ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              : NoImage
          }
            movieId={movie.id}
          />
        ))}
      </Grid>
      <Spinner />
    </>
  );
};

export default Home;