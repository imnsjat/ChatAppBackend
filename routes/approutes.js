const express = require('express');
const appcontroller = require('../controllers/appcontroller');
const authmiddleware = require('../middleware/auth');
const messagecontroller = require('../controllers/messagecontroller');
const router = express.Router();

router.get('/app' , appcontroller.app);

router.post('/send' ,authmiddleware.authenticate , messagecontroller.send );

router.get('/getMessages' , messagecontroller.getmessages)

module.exports = router ;