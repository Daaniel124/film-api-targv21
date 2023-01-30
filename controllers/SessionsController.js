const { db } = require("../db");
const Sessions = db.sessions

exports.getAll = async (req,res)=>{
    const sessions = await Sessions.findAll({attributes:["id", "session_date", "session_time"]})
    if (sessions.length == 0) {
        res.send({"message":"No sessions exist"}).end()
    } else {
        res.send(JSON.stringify(sessions))
    }
}

exports.createNew = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.getById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.updateById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.deleteById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}