const express = require('express');
const { getAll, show, update, deleteUser } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();


router.get('/getAll', isAuthenticated, getAll);
router.get('/:userId?', isAuthenticated, show);
router.put('/edit/:userId?',isAuthenticated, update);
router.delete('/delete/:userId?',isAuthenticated, deleteUser)

module.exports = router;