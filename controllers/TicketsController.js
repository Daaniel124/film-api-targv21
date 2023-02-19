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
    let ticket
    try {
        ticket = await Tickets.create(req.body,
        {
            logging:console.log,
            fields:["firstName", "lastName", "row", "columnNumber", "price", "sessionID"]
        })
    } catch (error) {
        if (error instanceof db.Sequilize.ValidationError) {
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("TicketCreate:",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return 
    }
    res.status(201)
        .location(`${getBaseUrl(req)}/tickets/${ticket.id}`)
        .json(ticket)
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
    const ticket = await Tickets.findByPk(req.params.id, {logging: console.log})
    if (ticket === null) {
        res.status(404).send({"error":"Ticket not found"})
        return
    } try {
        const deleted = await ticket.destroy() 
    } catch (error) {
        console.log("TicketDelete:", error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send({"message": "Ticket deleted"})
}