import Sequelize from 'sequelize'
import database from '../../shared/database/config'

class CommentModel {
    comments: any;

    constructor() {
        this.comments = database.define('comments', {
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
    }

    async create(comment: string, idPost: number) {
        await this.comments.sync({ force: false });
        await this.comments.create({ text: comment, idPost });
    }

    async getCommentById(id: string) {
        await this.comments.sync({ force: false });

        const comment = await this.comments.findOne({
            where: { id },
            attributes: ['id', 'text', 'idPost'],
        });
        return comment;
    }

    async deleteComment(id: string) {
        await this.comments.sync({ force: false });
        await this.comments.destroy({ where: { id } });
    }
}

export default new CommentModel()
