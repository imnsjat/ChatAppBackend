const express = require('express');
const appcontroller = require('../controllers/appcontroller');

const router = express.Router();

router.get('/app',appcontroller.app);

module.exports = router ;