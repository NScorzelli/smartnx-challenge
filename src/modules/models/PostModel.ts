import Sequelize from 'sequelize'
import database from '../../database/db'

class PostModel {
    posts = database.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
            text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    async create(text: string) {
        await this.posts.sync({ force: false });
        await this.posts.create({ text });
    }
}

export default new PostModel()
