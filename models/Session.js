module.exports = (sequelize, Sequelize, films) => {
    const sessions = sequelize.define("movie_sessions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        session_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        session_time: {
            type: Sequelize.DataTypes.TIME,
            allowNull: false
        },
        hall: {
            type: Sequelize.DataTypes.INTEGER
        },
        language: {
            type: Sequelize.STRING
        },
        filmID: {
            type: Sequelize.INTEGER,
            references:{
                model: films,
                key: "id"
            }
        }
    })
    /*Film.belongsToMany(Tickets, { through: Session})
    Tickets.belongsToMany(Film, { through: Session})*/
    films.hasMany(sessions, {foreignKey: 'filmID'})
    sessions.belongsTo(films, {foreignKey: 'filmID'})
    return sessions
}

