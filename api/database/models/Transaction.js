const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Transaction = sequelize.define('Transaction', {
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

module.exports = Transaction;