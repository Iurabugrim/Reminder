const sequelize = require('../db')
const { DataTypes } = require('sequelize')


 
const User = sequelize.define('user', {
    id:{type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const People = sequelize.define('people', {
    id:{type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    data: {type: DataTypes.DATE, allowNUll: false},
    img: {type: DataTypes.STRING, unique: true, allowNull: false}
})

User.hasMany(People)
People.belongsTo(User)

module.exports =  {
    User,
    People
}