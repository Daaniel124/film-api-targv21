module.exports = (sequelize, Sequelize, sessions) => {
    const tickets = sequelize.define("tickets", {
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
        },
        sessionID: {
            type: Sequelize.INTEGER,
            references:{
                model: sessions,
                key: "id"
            }
        }
    })
    sessions.hasMany(tickets, {foreignKey: 'sessionID'})
    tickets.belongsTo(sessions, {foreignKey: 'sessionID'})
    return tickets
}