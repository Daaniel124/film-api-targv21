const filmsController = require("../controllers/FilmsController.js")
const ticketsController = require("../controllers/TicketsController.js")
const sessionsController = require("../controllers/SessionsController.js")

module.exports = (app)=>{
    app.route("/films")
    .get(filmsController.getAll)
    .post(filmsController.createNew)    //Create
    app.route("/films/:id")
    .get(filmsController.getById)       //Read
    .put(filmsController.updateById)    //Update
    .delete(filmsController.deleteById) //Delete

    app.route("/tickets")
    .get(ticketsController.getAll)
    .post(ticketsController.createNew)    //Create
    app.route("/tickets/:id")
    .get(ticketsController.getById)       //Read
    .put(ticketsController.updateById)    //Update
    .delete(ticketsController.deleteById) //Delete

    app.route("/sessions")
    .get(sessionsController.getAll)
    .post(sessionsController.createNew)    //Create
    app.route("/sessions/:id")
    .get(sessionsController.getById)       //Read
    .put(sessionsController.updateById)    //Update
    .delete(sessionsController.deleteById) //Delete
}