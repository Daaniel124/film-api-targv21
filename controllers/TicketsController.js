const { db } = require("../db");
const Tickets = db.tickets

exports.getAll = async (req,res)=>{
    const tickets = await Tickets.findAll({attributes:["id", "firstName"]})
    if (tickets.length == 0) {
        res.send({"message":"No tickets exist"}).end()
    } else {
        res.send(JSON.stringify(tickets))
    }
}