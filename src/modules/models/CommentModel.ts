import Sequelize from 'sequelize'
import database from '../../shared/database/config'

class CommentModel {
    comments: any;

    constructor() {
        this.comments = database.define('comments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            idPost: {
                type: Sequelize.UUID,
                allowNull: false,
            },
        });
        this.init();
    }    

    async init () {
        await this.comments.sync({ force: false });
    }

    async create(comment: string, idPost: number) {
        await this.comments.create({ text: comment, idPost });
    }

    async getCommentById(id: string) {
        const comment = await this.comments.findOne({
            where: { id },
            attributes: ['id', 'text', 'idPost'],
        });
        return comment;
    }

    async deleteComment(id: string) {
        await this.comments.destroy({ where: { id } });
    }
}

export default new CommentModel()
