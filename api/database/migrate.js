const sequelize = require('./connection');
require('./index');

console.log("The database will be created and data erased.");
sequelize.sync();
console.log("The database has been created.");