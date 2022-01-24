const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('BirthdayReminder', 'postgres', 'omegil76', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
})

module.exports = sequelize