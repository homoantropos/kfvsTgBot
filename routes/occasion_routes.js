const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/occasion_controller');
const upload= require('../middleware/upload');


router.post('/create', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.createOccasion);
router.post('/addSubs/:id', passport.authenticate('jwt', {session: false}), controller.addSubscriber);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.updateOccasion);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteOccasion);
router.get('/', controller.getAllOccasions);
router.get('/:id', controller.getOccasionById);

module.exports = router
