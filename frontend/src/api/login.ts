// src/api/user.ts
import axios from 'axios';
import { UserType } from '../types/index';

export const login = async (email: string, password: string): Promise<{
  token: string;
  user: UserType
}> => {
  const response = await axios.post('http://localhost:3000/api/login', {
    email, password

  });
  return response.data;
};


