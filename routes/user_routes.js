const express = require('express');
const router = express.Router();

router.post('/create');
router.patch('/:id');
router.delete('/:id');
router.get('/');
router.get('/:id');


module.exports = router
