import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (error) {
      console.error('Erro no login', error);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginConteiner}>
        <h1>Login</h1>
        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.loginInput}
        />
        <input
          placeholder="Senha"
          type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
        />
        <button className={styles.buttonLogin} onClick={handleLogin}>Entrar</button>
        <p>
          Não possui uma conta?
          <a onClick={() => navigate('/register')}><strong> Cadastre-se</strong></a>
        </p>
      </div>
    </div>
  );
}

export default Login;
