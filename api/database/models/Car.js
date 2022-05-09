const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');

const Car = sequelize.define('Car', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = Car;