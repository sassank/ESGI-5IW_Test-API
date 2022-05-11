const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connexion');

const Transaction = sequelize.define('Transaction', {
  // Model attributes are defined here
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Transaction;