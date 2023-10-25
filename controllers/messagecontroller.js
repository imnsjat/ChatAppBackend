const Message = require('../models/message');
const { Op } = require('sequelize');
const Group = require('../models/group');
const sequelize = require('../util/database');

exports.send = async (req,res,next)=>{
    try{   
        const userId = req.user.id ; 
        const username = req.user.name;
        const message = req.body.message;
        const groupName = req.body.groupName;
        const group = await Group.findOne({ where: { name: groupName } });
        if (!group) {
            return res.status(404).json({ success: false, error: 'Group not found' });
        }
        const msg  = await Message.create({username: username ,message: message , userId : userId , groupId : group.id })
        res.status(200).json({message:msg})
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false , error : err});
    } 
}

exports.getmessages = async (req,res,next) =>{
    try{
        const lastMessageId = req.query.lastMessageId;
        const groupName = req.params.groupName;
        console.log('group name ',groupName )
        const group = await Group.findOne({ where: { name: groupName } });
        if (!group) {
            return res.status(404).json({ success: false, error: 'Group not found' });
        }
        let messages;
        if (lastMessageId) {
            messages = await Message.findAll({ where: { id: { [Op.gt]: lastMessageId } , groupId: group.id} } );
        }else{
            messages = await Message.findAll({where : { groupId: group.id }});
        }
        res.send(messages);
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false , error : err});
    } 
}