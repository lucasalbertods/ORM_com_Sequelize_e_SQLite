//index.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database');
const User = require('./models/User');
const { generateToken, authMiddleware } = require('./middleware/auth');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: '*',
  credentials: true
}))

// Middleware
app.use(express.json());

// Database
db.sync()
  .then(() =>{ 
    console.log('Banco de dados conectado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });


// Mock database

// Routes
app.post('/register', async (req, res) => {
  try{
      const { name, email } = req.body;
      const password = await bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro no servidor interno', error });
    } 
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Email invalido' });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha invalida' });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'Login realizado com sucesso', user, token });
  } catch (error) {
    
    res.status(500).json({ message: 'Erro interno no servidor' });
    console.error('Erro ao fazer login:', error);
  }
  
});

app.get('/users', authMiddleware, (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({ message: 'Usuários buscados com sucesso', users });
    })
    .catch((error) => {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ message: 'Erro no servidor interno', details: error.message });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});