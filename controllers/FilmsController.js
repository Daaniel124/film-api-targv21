const { db } = require("../db");
const { getBaseUrl } = require("./helpers")
const Films = db.films

exports.getAll = async (req,res)=>{
    const films = await Films.findAll({attributes:["id", "title"]})
    res.send(JSON.stringify(films))
}

exports.createNew = async (req,res)=>{
    let film
    try {
        film = await Films.create(req.body,
        {
            logging:console.log,
            fields:["title", "genre", "duration", "producer", "actors", "description"]
        })
    } catch (error) {
        if (error instanceof db.Sequilize.ValidationError) {
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("FilmsCreate:",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return 
    }
    res.status(201)
        .location(`${getBaseUrl(req)}/films/${film.id}`)
        .json(film)
}
exports.getById = async (req,res)=>{
    const film = await Films.findByPk(req.params.id, {logging: console.log})
    if (film === null) {
        res.status(404).send({"error":"Film not found"})
    } else {
        res.send(film)
    }
}
exports.updateById = async (req,res)=>{
    let film = await Films.findByPk(req.params.id, {logging: console.log})
    if (film === null) {
        res.status(404).send({"error":"Film not found"})
        return
    }  
    try {
        film = await film.update(req.body,
        {
            where: { id: req.params.id},
            logging:console.log
        })
    } catch (error) {
        if (error instanceof db.Sequilize.ValidationError) {
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("FilmsUpdate:",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return 
    }
    res.status(200)
        .location(`${getBaseUrl(req)}/films/${film.id}`)
        .json(film)
}
exports.deleteById = async (req,res)=>{
    const film = await Films.findByPk(req.params.id, {logging: console.log})
    if (film === null) {
        res.status(404).send({"error":"Film not found"})
        return
    } try {
        const deleted = await film.destroy() 
    } catch (error) {
        console.log("FilmDelete:", error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send()
}