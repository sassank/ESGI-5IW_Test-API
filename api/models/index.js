const sequelize = require('./connection');

const User = require('./User');
const Car = require('./Car');
const Transaction = require('./Transaction');

// Define that Car has one User and User has many Cars
User.hasMany(Car);
Car.belongsTo(User);
