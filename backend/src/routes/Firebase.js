const express = require('express');
const router = express.Router();


const { logIn} = require('../controllers/Firebase')

router.post('/', logIn);

module.exports = router;