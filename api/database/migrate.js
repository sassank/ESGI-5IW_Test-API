const sequelize = require('./connexion');
require('./init_database');

console.log("The database will be created and data erased.");
sequelize.sync();
console.log("The database has been created.");