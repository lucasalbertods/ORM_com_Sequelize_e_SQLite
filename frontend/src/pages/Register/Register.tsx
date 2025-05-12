import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/Register';
import styles from './Register.module.css'


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register(name, email, password);
    navigate('/');
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginConteiner}>
        <h1>Registrar</h1>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.registerInput}
        />
        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.registerInput}
        />
        <input
          placeholder="Senha"
          type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.registerInput}
        />
        <button className={styles.registerButton} onClick={handleRegister}>Registrar</button>
        <p>
          Já tem uma conta?
          <a onClick={() => navigate('/')}> Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
