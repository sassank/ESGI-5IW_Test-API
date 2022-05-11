const User = require('./models/User');
require('./factories/UserFactory');
const Car = require('./models/Car');
const Transaction = require('./models/Transaction');
const sequelize = require('./connexion');

// Define that Car has one User and User has many Cars
User.hasMany(Car);
Car.belongsTo(User);

// Define that User has many Transactions and Transaction has one User
User.hasMany(Transaction);
Transaction.belongsTo(User)

// Define that a Transaction has one Car and Car has many Transactions
Car.hasMany(Transaction);
Transaction.belongsTo(Car);

// Simplify transactions
sequelize.constructor._cls = new Map();
sequelize.ezTransaction = {
    async listen() {
        const trx = await sequelize.transaction();
        sequelize.constructor._cls.set('transaction', trx);
    },
    async rollback() {
        if (sequelize.constructor._cls.has('transaction')) {
            await sequelize.constructor._cls.get('transaction').rollback();
            sequelize.constructor._cls.delete('transaction');
        }
    }
}