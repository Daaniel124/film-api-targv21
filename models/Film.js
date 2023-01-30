const { TIME } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("films", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        duration: {
            type: Sequelize.DataTypes.TIME
        },
        producer: {
            type: Sequelize.STRING
        },
        actors: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        }
    })

    return Film
}