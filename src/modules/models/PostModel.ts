import Sequelize from 'sequelize'
import database from '../../shared/database/config'
import CommentModel from './CommentModel'

class PostModel {
    posts: any;

    constructor() {
        this.posts = database.define('posts', {
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

        this.posts.hasMany(CommentModel.comments, {
            as: 'comments',
            foreignKey: 'idPost',
            sourceKey: 'id'
        });
    }

    async create(post: string) {
        await this.posts.sync({ force: false });
        await this.posts.create({ text: post });
    }
}

export default new PostModel()
