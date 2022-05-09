const { Sequelize, DataTypes } = require('sequelize');
import sequelize from './connection';

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

export default Car;