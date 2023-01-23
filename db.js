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

db.films = require("./models/Film")(sequelize,Sequilize)

//await sequelize.sync({force:true}) // Erase all and recreate
async () => await sequelize.sync({alter:true}) // Alter existing tables to matc the model

module.exports = db