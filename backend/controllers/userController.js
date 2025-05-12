const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Email inválido' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Senha inválida' });

    const token = generateToken(user);
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: 'Login OK', user: userInfo, token });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
};

module.exports = { register, login };
