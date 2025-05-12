import { MovieType, UserType } from '../types';

export const saveMovies = async (movie: MovieType, token: string, userData: UserType, setMessage: (msg: string) => void) => {
  try {
    const response = await fetch('http://localhost:3000/api/register/movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        genres: movie.genres,
        imdb_id: movie.imdb_id,
        trailer_url: movie.trailer_url,
        userId: userData.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Filme salvo com sucesso:', data.movie);
      setMessage('Filme salvo com sucesso!');
    } else {
      console.error('Erro ao salvar filme:', data.message);
      setMessage(`Erro ao salvar filme: ${data.message}`);
    }
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
    setMessage('Erro ao fazer requisição.');
  }
};
