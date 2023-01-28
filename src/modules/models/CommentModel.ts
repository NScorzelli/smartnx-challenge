import Sequelize from 'sequelize'
import database from '../../database/db'
import PostModel from './PostModel'

class CommentModel {
    async create(comment: string, idPost: number) {
        const comments = database.define('comments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            idPost: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });

        comments.belongsTo(PostModel.posts, {
            as: 'post',
            foreignKey: 'idPost',
            targetKey: 'id'
        });
    
        PostModel.posts.hasMany(comments, {
            as: 'comments',
            foreignKey: 'idPost',
            sourceKey: 'id'
        });

        await comments.sync({ force: false });
        await comments.create({ text: comment, idPost });
    }
}

export default new CommentModel()