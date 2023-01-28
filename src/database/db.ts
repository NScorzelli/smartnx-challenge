import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
    'challengedb',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
    }
);


export default sequelize;