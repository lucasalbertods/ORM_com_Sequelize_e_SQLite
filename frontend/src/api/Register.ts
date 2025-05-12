import axios from 'axios';

export const register = async (name: string, email: string, password: string): Promise<string | undefined> => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      name,
      email,
      password
    });

    if (response.status === 200 || response.status === 201) {
      return 'Usuário cadastrado com sucesso!';
    }

    throw new Error('Erro ao cadastrar usuário');

  } catch (error) {
    console.error('Erro no servidor', error);
  }
};