const { db } = require("../db");
const Films = db.films

exports.getAll = async (req,res)=>{
    const films = await Films.findAll({attributes:["id", "title"]})
    res.send(JSON.stringify(films))
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