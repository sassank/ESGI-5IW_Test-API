const sequelize = require('./connection');

const User = require('./User');
const Car = require('./Car');
const Transaction = require('./Transaction');

Car.hasOne(User);

User.hasMany(Car);
Car.belongsTo(User);
