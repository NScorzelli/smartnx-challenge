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

    async getPosts() {
        await this.posts.sync({ force: false });

        const posts = await this.posts.findAll({
            attributes: ['id', 'text'],
            include: [
                {
                    model: CommentModel.comments,
                    as: 'comments',
                    attributes: ['id', 'text', 'idPost'],
                },
            ],
        });
        return posts;
    }

    async getPost(id: string) {
        await this.posts.sync({ force: false });

        const post = await this.posts.findOne({
            where: { id },
            attributes: ['id', 'text'],
            include: [
                {
                    model: CommentModel.comments,
                    as: 'comments',
                    attributes: ['id', 'text', 'idPost'],
                },
            ],
        });

        if (!post) {
            return null;
        }
        return post;
    }

    async update(id: string, text: string) {
        await this.posts.sync({ force: false });

        const post = await this.posts.findOne({
            where: { id },
            attributes: ['id', 'text'],
            include: [
                {
                    model: CommentModel.comments,
                    as: 'comments',
                    attributes: ['id', 'text', 'idPost'],
                },
            ],
        });

        if (!post) {
            return null;
        }

        await this.posts.update({ text }, { where: { id } });

        return post;
    }

    async delete(id: string) {
        await this.posts.sync({ force: false });

        const post = await this.posts.findOne({
            where: { id },
            attributes: ['id', 'text'],
            include: [
                {
                    model: CommentModel.comments,
                    as: 'comments',
                    attributes: ['id', 'text', 'idPost'],
                },
            ],
        });

        if (!post) {
            return null;
        }

        await this.posts.destroy({ where: { id } });

        return post;
    }
}

export default new PostModel()
