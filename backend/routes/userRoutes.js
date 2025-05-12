const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

router.post('/api/register', register);
router.post('/api/login', login);

module.exports = router;
