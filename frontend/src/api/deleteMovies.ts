import { MovieType } from '../types';

export const deleteMovies = async (movie: MovieType, token: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/delete/${movie.id}/movie`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Filme deletado com sucesso!', data.movie);
        } else {
            console.error('Erro ao deletar filme:', data.message || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
    }
};
