const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller');

router.post('/create', controller.createUser);
router.patch('/:id');
router.delete('/:id');
router.get('/');
router.get('/:id');


module.exports = router
