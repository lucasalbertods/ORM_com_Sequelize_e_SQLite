import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const fazerLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: 'eduardo@gmail.com',
          password: '123456'
        });
        setToken(response.data.token)
      } catch (error) {
        console.error('Erro no Login', error);
      }
    };

    fazerLogin();
  }, [])

  useEffect(()=>{
    const listUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            xxxx: "teste"
          }
        });

        console.log(response.data.users)
      } catch (error) {
        console.error('Erro ao listar usuários', error);
      }
    } 
    listUsers();
  },[token])

  return (
    <div>
      <h1>{`${token}`}</h1>
    </div>
  )
}

export default App
