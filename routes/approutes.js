const express = require('express');
const appcontroller = require('../controllers/appcontroller');
const authmiddleware = require('../middleware/auth');
const messagecontroller = require('../controllers/messagecontroller');
const groupcontroller = require('../controllers/groupcontroller');
const admincontroller = require('../controllers/admincontroller');
const router = express.Router();

router.get('/app' , appcontroller.app);

router.post('/send' ,authmiddleware.authenticate , messagecontroller.send );

router.get('/getGroupMessages/:groupName' , messagecontroller.getmessages); 


router.get('/getGroups' ,authmiddleware.authenticate, groupcontroller.getUserGroups); 

router.post('/createGroup' ,authmiddleware.authenticate, groupcontroller.createGroup); 

router.post('/joinGroup' ,authmiddleware.authenticate, groupcontroller.joinGroup); 

router.post('/addUser' ,authmiddleware.authenticate, admincontroller.addUser); 

router.post('/makeAdmin' ,authmiddleware.authenticate, admincontroller.makeAdmin); 

router.post('/removeUser' ,authmiddleware.authenticate, admincontroller.removeUser); 



module.exports = router ;