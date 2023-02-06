require("dotenv").config()

const Sequilize = require("sequelize")
const sequelize = new Sequilize(process.env.DB_BASE,process.env.DB_USER,process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: false
    }
})

const db = {}

db.Sequilize = Sequilize
db.sequelize = sequelize

db.films = require("./models/Film.js")(sequelize,Sequilize);
db.sessions = require("./models/Session.js")(sequelize,Sequilize, db.films);
db.tickets = require("./models/Tickets.js")(sequelize,Sequilize, db.sessions, db.films);

async function Sync() {
    console.log("Begin Sync");
    //await sequelize.sync({force:true}) // Erase all and recreate
    await sequelize.sync({alter:true}) // Alter existing tables to matc the model
    console.log("Sync Done");
}

module.exports = { db, Sync };