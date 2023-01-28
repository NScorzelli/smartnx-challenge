import Sequelize from 'sequelize'
import database from '../../database/db'
import PostModel from './../models/PostModel'

const comments = database.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    idPost: {
        type: Sequelize.INTEGER,
        references: {
            model: 'posts',
            key: 'id'
        }
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

export default { 
    comments
}