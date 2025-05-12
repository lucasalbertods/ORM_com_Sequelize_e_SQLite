import { useLocation, useNavigate } from 'react-router-dom';
import { MovieType, UserType } from '../../types/index';
import { deleteMovies } from '../../api/deleteMovies';
import { useState, useEffect } from 'react';
import chevronLeft from '../../../public/chevron_left.svg';
import playlistAdd from '../../../public/playlist_add.svg';
import viewTrailer from '../../../public/movie.svg';
import styles from './MovieDetails.module.css';

function MyMovieDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [token, setToken] = useState('');


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUser));
    }
  }, []);


 const movie: MovieType = state?.movie;

const handleDeleteMovie = () => {
  if (!userData) return;
  deleteMovies(movie, token);
};


  if (!movie) {
    return (
      <div>
        <p>Filme não encontrado</p>
        <button onClick={() => navigate(-1)}>
          <img src={chevronLeft} alt="" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={styles.detailBackground}
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
      }}>
      <div className={styles.detailContent}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)}>
            <img src={chevronLeft} alt="" />
          </button>
        </div>
        <div className={styles.main}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.description}>{movie.overview}</p>
          <div className={styles.yearAndRate}>
            <p className={styles.date}><strong>Ano de Estreia:</strong> {movie.release_date.slice(0, 4)}</p>
            <p
              className={
                movie.vote_average < 5
                  ? styles.rateRed
                  : movie.vote_average < 7
                    ? styles.rateOrange
                    : styles.rateGreen
              }
            >
              <strong>Nota: </strong>{movie.vote_average} <strong>IMDb</strong>
            </p>
          </div>
          <div className={styles.buttonContent}>
            <button onClick={handleDeleteMovie} className={styles.addMovieButton}>
              <img src={playlistAdd} alt="" />
              Remover da lista
            </button>
            <a href={movie.trailer_url}>
              <button className={styles.addMovieButton}>
                <img src={viewTrailer} alt="" />
                Ver Trailer
              </button>
            </a>
          </div>
        </div>
      </div>
      {/* Se tiver mais campos, adiciona aqui */}
    </div>
  );
}

export default MyMovieDetails;
