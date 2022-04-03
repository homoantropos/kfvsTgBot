const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createUser);
router.post('/login', controller.login);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateUser);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getUserById);


module.exports = router
