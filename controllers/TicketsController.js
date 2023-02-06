const { db } = require("../db");
const { getBaseUrl } = require("./helpers")
const Tickets = db.tickets

/*exports.getAll = async (req,res)=>{
    const tickets = await Tickets.findAll({attributes:["id", "firstName"]})
    if (tickets.length == 0) {
        res.send({"message":"No tickets exist"}).end()
    } else {
        res.send(JSON.stringify(tickets))
    }
}*/

exports.getAll = async (req,res) =>{
    const tickets = await Tickets.findAll({
        include: { all: true},
        logging: console.log
    })
    /*let result = []
    result = tickets.map( (gp) => {
        return {
            "gameName": gp.Game.name,
            "playerName": `${gp.Player.firstName} ${gp.Player.lastName}`,
            "playTime": gp.playTimeMinutes
        }
    })
    res.send(result)*/
}

exports.createNew = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.getById = async (req,res)=>{
    const ticket = await Tickets.findByPk(req.params.id, {logging: console.log})
    if (ticket === null) {
        res.status(404).send({"error":"Ticket not found"})
    } else {
        res.send(ticket)
    }
}
exports.updateById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.deleteById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}