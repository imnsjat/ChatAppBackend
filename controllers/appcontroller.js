
const User = require('../models/user')
const path = require('path');
const sequelize = require('../util/database');

exports.app = (req,res,next)=>{
    res.sendFile(path.join(__dirname,  '../app.html'));
}