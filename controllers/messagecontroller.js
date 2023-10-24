const Message = require('../models/message');
const { Op } = require('sequelize');
const sequelize = require('../util/database');

exports.send = async (req,res,next)=>{
    try{   
        const userId = req.user.id ; 
        const username = req.user.name;
        const message = req.body.message;
        const msg  = await Message.create({username: username ,message: message , userid : userId })
        res.status(200).json({message:msg})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false , error : err});
    } 
}

exports.getmessages = async (req,res,next) =>{
    try{
        const lastMessageId = req.query.lastMessageId;
        console.log('last message id : ' , lastMessageId) ;
        let messages;
        if (lastMessageId) {
            messages = await Message.findAll({ where: { id: { [Op.gt]: lastMessageId } } } );
        }else{
            messages = await Message.findAll();
        }
        res.send(messages);
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false , error : err});
    } 
}