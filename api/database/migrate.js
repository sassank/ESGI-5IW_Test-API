const sequelize = require('./connexion');
require('./init_database');

(async () => {
    console.log("The database will be created and data erased.");
    await sequelize.sync();
    console.log("The database has been created.");
})();