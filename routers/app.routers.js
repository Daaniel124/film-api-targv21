const filmsController = require("../controllers/FilmsController.js")
const ticketsController = require("../controllers/TicketsController.js")

module.exports = (app)=>{
    app.route("/films")
    .get(filmsController.getAll)
/*    .post(filmsController.createNew)    //Create
    app.ruote("/films/:id")
    .get(filmsController.getById)       //Read
    .put(filmsController.updateById)    //Update
    .delete(filmsController.deleteById) //Delete*/

    app.route("/tickets")
    .get(ticketsController.getAll)
/*    .post(ticketsController.createNew)    //Create
    app.ruote("/tickets/:id")
    .get(ticketsController.getById)       //Read
    .put(ticketsController.updateById)    //Update
    .delete(ticketsController.deleteById) //Delete*/
}