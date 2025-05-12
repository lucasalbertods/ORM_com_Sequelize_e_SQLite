import axios from "axios";
import { MovieType } from "../types";

export const searchMovies = async (movieName: string, token: string): Promise<MovieType[]> => {
    const response = await axios.get(`http://localhost:3000/api/movies/search?query=${movieName}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}