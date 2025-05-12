// src/api/movie.ts
import axios from 'axios';
import { MovieType } from '../types';

export const getUserMovies = async (userId: number, token: string): Promise<MovieType[]> => {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}/movies`, {
        headers: {
            Authorization: `Bearer ${token}`
        }

    });
    return response.data;
};
