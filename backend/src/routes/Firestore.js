const express = require('express');
const router = express.Router();
const validateFirebaseIdToken = require('../middlewares/validateFirebaseIdToken')
const authenticate = require('../middlewares/authenticate')

const { updateConfig, getConfig} = require('../controllers/Firestore')

router.post('/update', validateFirebaseIdToken, updateConfig);
router.get('/get', authenticate, getConfig);

module.exports = router;