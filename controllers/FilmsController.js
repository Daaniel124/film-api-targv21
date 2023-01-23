const db = require("../db");
const Films = db.films

exports.getAll = async (req,res)=>{
    const films = await Films.findAll()
    res.send(JSON.stringify(films))
}