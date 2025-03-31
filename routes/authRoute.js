const express = require('express');
const { signup, confirm, signin, logout, forgot, reset } = require('../controllers/authController');
const router = express.Router();


// authentication
router.post('/signup', signup);
router.post('/confirm', confirm)
router.post('/signin', signin);
router.get('/logout', logout);
router.post('/forgot', forgot);
router.post('/reset', reset);

module.exports = router;