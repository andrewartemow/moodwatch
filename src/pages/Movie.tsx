import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Spinner from '../components/Spinner';

interface MovieInterface {
  movieTitle: string | null;
  movieDescription: string | null;
  movieGenres: string[] | null;
  movieVideoKey: string | null;
  movieRating: number | null;
  fetchMovie: (ids: string) => {};
}

const Movie = ({
  movieTitle,
  movieDescription,
  movieGenres,
  movieVideoKey,
  movieRating,
  fetchMovie,
}: MovieInterface) => {
  const [loaderIsRunning, setLoaderIsRunning] = useState(true);

  useEffect(() => {}, [
    movieTitle,
    movieDescription,
    movieGenres,
    movieVideoKey,
    movieRating,
  ]);

  setTimeout(() => {
    setLoaderIsRunning(false);
  }, 2000);

  return (
    <div className="h-full pt-20 pb-20 text-primary">
      <div className="container mx-auto px-4 h-full">
        {!loaderIsRunning ? (
          <div className="card xl:w-2/3 bg-base-100 mx-auto shadow-xl">
            {movieVideoKey || localStorage.getItem('m_trailer_key') ? (
              <YouTube
                opts={{ width: '100%', height: 400 }}
                videoId={
                  movieVideoKey ||
                  (localStorage.getItem('m_trailer_key') as string)
                }
              />
            ) : (
              <h2 className="text-center font-bold text-2xl mb-10">
                <span className="text-4xl">😶‍🌫️</span>Failed to load video
              </h2>
            )}
            <div className="card-body">
              <h2 className="card-title mb-4">
                {movieTitle || localStorage.getItem('m_title')}
              </h2>
              <p className="mb-2">
                {(
                  movieGenres ||
                  JSON.parse(localStorage.getItem('m_genres') as string)
                )
                  ?.slice(0, 5)
                  .map((genre: string) => (
                    <span
                      key={genre}
                      className="p-1 border-2 border-primary mr-2 rounded-md"
                    >
                      {genre}
                    </span>
                  ))}
              </p>
              {(movieRating || localStorage.getItem('m_rating')) && (
                <p className="mb-2">IMBD Raiting: {movieRating}</p>
              )}
              <p>{movieDescription || localStorage.getItem('m_descr')}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setLoaderIsRunning(true);
                    setTimeout(() => {
                      setLoaderIsRunning(false);
                    }, 2000);
                    fetchMovie(localStorage.getItem('moodIDS') as string);
                  }}
                >
                  Next 👉🏻
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Movie;
