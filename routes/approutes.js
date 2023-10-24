const express = require('express');
const appcontroller = require('../controllers/appcontroller');
const authmiddleware = require('../middleware/auth');
const messagecontroller = require('../controllers/messagecontroller');
const router = express.Router();

router.get('/app', appcontroller.app);

router.post('/send' ,authmiddleware.authenticate , messagecontroller.send );

module.exports = router ;