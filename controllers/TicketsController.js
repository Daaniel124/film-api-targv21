const { db } = require("../db");
const { getBaseUrl } = require("./helpers")
const Tickets = db.tickets
const Sessions = db.sessions
const Film = db.films

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
    let result = []
    result = tickets.map( (gp) => {
        return {
            "id": gp.id,
            "firstName": gp.firstName,
            "lastName": gp.lastName,
            "session": gp.sessionID,
            "filmID": gp.movie_session.filmID,
            "session_time": gp.movie_session.session_time,
            "session_date": gp.movie_session.session_date
        }
    })
    res.send(result)
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