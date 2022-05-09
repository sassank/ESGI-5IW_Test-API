const { Sequelize, DataTypes } = require('sequelize');
import sequelize from './connection';

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

export default User;