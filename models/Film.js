module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("films", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        }
    })

    return Film
}