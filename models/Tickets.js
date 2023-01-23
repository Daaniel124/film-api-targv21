const { TIME } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        row: {
            type: Sequelize.INTEGER
        },
        columnNumber: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        }
    })

    return Ticket
}