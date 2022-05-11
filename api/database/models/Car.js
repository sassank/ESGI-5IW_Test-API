const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');

const Car = sequelize.define('Car', {
  // Model attributes are defined here
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = Car;