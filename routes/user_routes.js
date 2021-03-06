const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/user_controller');

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createUser);
router.get('/confirm/:confirmationCode', controller.confirmUser);
router.post('/reset', controller.sentLinkToResetPassword);
router.get('/reset/:confirmationCode', controller.sentFormForPasswordReset);
router.get('/resetpass', controller.resetPassword);
router.post('/login', controller.login);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateUser);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllUsers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getUserById);


module.exports = router
