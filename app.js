require('dotenv').config()
const http = require("http");
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const {Server}= require('socket.io');
const sequelize = require('./util/database');
const authroutes = require('./routes/authroutes');
const approutes = require('./routes/approutes');
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const GroupUser = require('./models/groupuser');


const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', socket=>{
    console.log('a new user has connected' , socket.id);
    socket.on('newMessage',(msg)=>{
        io.emit('newMessage' , msg)
    })
})
app.use(express.json());
app.use(cors());



app.use(authroutes);
app.use(approutes);

User.hasMany(Message);
Group.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Group);
User.belongsToMany(Group , {through  :  GroupUser});
Group.belongsToMany(User , {through  :  GroupUser});

module.exports.io = io;

Group.findOrCreate({ where: { name: 'public' } })
    .then(([group, created]) => {
        if (created) {
            console.log('Public group created');
        } else {
            console.log('Public group already exists');
        }
    })
    .catch(err => console.log(err));

// sequelize.sync({force:true})
sequelize.sync()
.then(() => {
    return Group.findOrCreate({ where: { name: 'public' } });
})
.then(([group, created]) => {
    if (created) {
        console.log('Public group created');
    } else {
        console.log('Public group already exists');
    }
    return server.listen(process.env.PORT || 3000);
})
.catch(err => console.log(err));
