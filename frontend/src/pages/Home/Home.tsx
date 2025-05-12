import { useEffect, useState } from 'react';
import { getUserMovies } from '../../api/getUserMovies';
import { searchMovies } from '../../api/searchMovies';
import { UserType, MovieType } from '../../types';
import { useNavigate } from 'react-router-dom';
import search from '../../../public/search.svg';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState<UserType | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [movieName, setMovieName] = useState('');
  const [imdbMovies, setImdbMovies] = useState<MovieType[]>([]);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedToken || !storedUser) {
      navigate('/');
      return;
    }

    setToken(storedToken);
    setUserData(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      handleGetMovies();
    }
  }, [userData]);


  const handleSearchMovies = async () => {
    try {
      const movies = await searchMovies(movieName, token);
      setImdbMovies(movies);
    } catch (error) {
      console.error('Erro ao buscar filme!', error);
    }
  };

  const handleGetMovies = async () => {
    if (!userData) return;

    try {
      const movies = await getUserMovies(userData.id, token);
      setMovies(movies);
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.searchContent}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Digite o nome do filme"
          className={styles.inputSearchMovie}
        />

        <button className={styles.buttonSearchMovie} onClick={handleSearchMovies}>
          <img src={search} alt="" />
        </button>
      </div>

      {imdbMovies.length > 0 && (
        <div className={styles.userMoviesContent}>
          <h2 className={styles.contentTitle}>Resultado da busca (IMDB)</h2>
          <div className={styles.moviesContent}>
            {imdbMovies.map((movie) => (
              <div
                className={styles.movies}
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}>
                <img
                  className={styles.movieImage}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Poster"
                />
                <h2 className={styles.movieTitle}>{movie.title}</h2>
              </div>
            ))}
          </div>
        </div>
      )}


      {movies.length > 0 && (
        <div className={styles.userMoviesContent}>
          <h2 className={styles.contentTitle}>Minha Lista</h2>
          <div className={styles.moviesContent}>
            {movies.map((movie) => (
              <div
                className={styles.movies}
                key={movie.id}
                onClick={() => navigate(`/library/movie/${movie.id}`, { state: { movie } })}>
                <img className={styles.movieImage}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Poster"
                />
                <h2 className={styles.movieTitle}>{movie.title}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
