const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/subscriber_controller');
const bot = require('../bot');

router.post('/create', passport.authenticate('jwt', {session: false}), controller.createSubscriber);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.updateSubscriber);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteSubscriber);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getSubscribers);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getSubscriberById);

module.exports = router
