const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const controller = require('../controllers/message_controller');

router.post('/photo', upload.none(), passport.authenticate({session: false}), controller.sendPhoto);

module.exports = router
