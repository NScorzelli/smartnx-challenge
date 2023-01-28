const Sequelize = require('sequelize');
const sequelize = new Sequelize('challengedb', 'root', 'root', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;