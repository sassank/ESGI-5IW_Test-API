const sequelize = require('./connection');

const User = require('./User');
const Car = require('./Car');
const Transaction = require('./Transaction');

// Define that Car has one User and User has many Cars
User.hasMany(Car);
Car.belongsTo(User);

// Define that User has many Transactions and Transaction has one User
User.hasMany(Transaction);
Transaction.belongsTo(User)

// Define that a Transaction has one Car and Car has many Transactions
Car.hasMany(Transaction);
Transaction.belongsTo(Car);