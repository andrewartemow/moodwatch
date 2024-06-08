import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Movie from './pages/Movie';

import { GENRES } from './data';

function App() {
  const [movieTitle, setMovieTitle] = useState<null | string>(null);
  const [movieVideoKey, setMovieVideoKey] = useState<null | string>(null);
  const [movieDescription, setMovieDescription] = useState<null | string>(null);
  const [movieGenres, setMovieGenres] = useState<null | string[]>(null);
  const [movieRating, setMovieRating] = useState<null | number>(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  let movieIdRef: number | null;

  const fetchMovieData = async (ids: string) => {
    setMovieVideoKey(null);
    setMovieTitle(null);
    setMovieDescription(null);
    setMovieGenres(null);
    setMovieRating(null);

    await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${ids}`,
      options
    )
      .then((response) => response.json())
      .then(async (response) => {
        // console.log(response.total_pages);

        await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${Math.floor(
            Math.random() *
              (response.total_pages > 10 ? 10 : response.total_pages) +
              1
          )}&sort_by=popularity.desc&with_genres=${ids}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            const randomMovie =
              response.results[
                Math.floor(Math.random() * response.results.length)
              ];

            // console.log(randomMovie);

            // debugger;
            setMovieTitle(randomMovie.original_title);
            setMovieDescription(randomMovie.overview);
            const genres = randomMovie.genre_ids.map(
              (id: number) => GENRES.find((genre) => genre.id === id)?.name
            );
            setMovieGenres(genres);
            setMovieRating(randomMovie.vote_average);

            localStorage.setItem('m_title', randomMovie.original_title);
            localStorage.setItem('m_descr', randomMovie.overview);
            localStorage.setItem('m_genres', JSON.stringify(genres));
            localStorage.setItem('m_rating', randomMovie.vote_average);

            movieIdRef = randomMovie.id;
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  const fetchMovieTrailer = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${movieIdRef}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.results.length !== 0) {
          const officialTrailer = response.results.find(
            (item: any) => item.name === 'Official Trailer'
          );

          const trailerKey = officialTrailer
            ? officialTrailer.key
            : response.results[0].key;

          // console.log(trailerKey);
          setMovieVideoKey(trailerKey);
          localStorage.setItem('m_trailer_key', trailerKey);
          return;
        }
        localStorage.removeItem('m_trailer_key');
      })
      .catch((err) => console.error(err));
  };

  const fetchMovie = async (ids: string) => {
    await fetchMovieData(ids);
    fetchMovieTrailer();
  };

  return (
    <>
      <BrowserRouter>
        <Header logo="MoodWatch" />
        <Routes>
          <Route
            index
            path="/"
            element={<Home onClick={(ids: string) => fetchMovie(ids)} />}
          />
          <Route
            path="/movie"
            element={
              <Movie
                movieTitle={movieTitle}
                movieDescription={movieDescription}
                movieGenres={movieGenres}
                movieVideoKey={movieVideoKey}
                movieRating={movieRating}
                fetchMovie={fetchMovie}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
