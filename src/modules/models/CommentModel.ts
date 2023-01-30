import Sequelize from 'sequelize'
import database from '../../shared/database/config'

export interface Comment {
  id: string
  text: string
  idPost: string
}

class CommentModel {
  comments: any

  constructor () {
    this.comments = database.define('comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idPost: {
        type: Sequelize.UUID,
        allowNull: false
      }
    })
    this.comments.sync({ force: false })
  }

  async create (comment: string, idPost: number): Promise<void> {
    await this.comments.create({ text: comment, idPost })
  }

  async getCommentById (id: string): Promise<Comment> {
    const comment = await this.comments.findOne({
      where: { id },
      attributes: ['id', 'text', 'idPost']
    })
    return comment
  }

  async deleteComment (id: string): Promise<number> {
    const response = await this.comments.destroy({ where: { id } })

    return response
  }
}

export default new CommentModel()
