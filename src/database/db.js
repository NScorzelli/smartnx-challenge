    const Sequelize = require('sequelize')
    require('dotenv').config()

    const sequelize = new Sequelize(
        'challengedb',
        'root',
        'root',
        {
            dialect: 'mysql',
            host:  'localhost',
            port: 3306
        }
    );

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         dialect: 'mysql',
//         host:  process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// );

module.exports = sequelize