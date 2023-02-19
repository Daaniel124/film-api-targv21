const { db } = require("../db");
const { getBaseUrl } = require("./helpers")
const Sessions = db.sessions
const Film = db.films

/*exports.getAll = async (req,res)=>{
    const sessions = await Sessions.findAll({attributes:["id", "session_date", "session_time"]})
    if (sessions.length == 0) {
        res.send({"message":"No sessions exist"}).end()
    } else {
        res.send(JSON.stringify(sessions))
    }
}*/
exports.getAll = async (req,res) =>{
    const sessions = await Sessions.findAll({
        include: { all: true},
        //include: { model: Film, as: "filmName" },
        logging: console.log
    })
    let result = []
    result = sessions.map( (gp) => {
        return {
            "id": gp.id,
            "filmName": gp.film.title,
            "tickets": gp.tickets.length,
            "session_time": gp.session_time,
            "session_date": gp.session_date
            /*"playerName": `${gp.Player.firstName} ${gp.Player.lastName}`,
            "playTime": gp.playTimeMinutes*/
        }
    })
    res.send(result)
    //res.send(sessions)
}

exports.createNew = async (req,res)=>{
    let session
    try {
        session = await Sessions.create(req.body,
        {
            logging:console.log,
            fields:["session_date", "session_time", "hall", "language", "filmID"]
        })
    } catch (error) {
        if (error instanceof db.Sequilize.ValidationError) {
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("SessionsCreate:",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return 
    }
    res.status(201)
        .location(`${getBaseUrl(req)}/sessions/${session.id}`)
        .json(session)
}
exports.getById = async (req,res)=>{
    const session = await Sessions.findByPk(req.params.id, {
        logging: console.log,
        include: {
          model: Film,
          attributes: ["title"]
        }
      })
    if (session === null) {
        res.status(404).send({"error":"Session not found"})
    } else {
        res.send(session)
    }
}
exports.updateById = async (req,res)=>{
    res.send({"message":"Not ipmlemented yet"})
}
exports.deleteById = async (req,res)=>{
    const session = await Sessions.findByPk(req.params.id, {logging: console.log})
    if (session === null) {
        res.status(404).send({"error":"Session not found"})
        return
    } try {
        const deleted = await session.destroy() 
    } catch (error) {
        console.log("SessionDelete:", error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send({"message": "Session deleted"})
}