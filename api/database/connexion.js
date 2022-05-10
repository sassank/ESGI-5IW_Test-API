const { Sequelize } = require('sequelize');
module.exports = new Sequelize('postgres://postgres:postgres@postgres:5432/api', {
    logging: false
});