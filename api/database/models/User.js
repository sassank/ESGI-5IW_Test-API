const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');

const User = sequelize.define('User', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = User;