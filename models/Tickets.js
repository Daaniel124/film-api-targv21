module.exports = (sequelize, Sequelize, sessions, films) => {
    const tickets = sequelize.define("tickets", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
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
        },
        sessionID: {
            type: Sequelize.INTEGER,
            references:{
                model: sessions,
                key: "id"
            }
        }/*,
        filmID: {
            type: Sequelize.INTEGER,
            references:{
                model: sessions,
                key: "filmID"
            }
        }*/
    })
    sessions.hasMany(tickets, {foreignKey: 'sessionID'})
    tickets.belongsTo(sessions, {foreignKey: 'sessionID'})
    /*sessions.hasMany(tickets, {foreignKey: 'filmID'})
    tickets.belongsTo(sessions, {foreignKey: 'filmID'})*/
    return tickets
}