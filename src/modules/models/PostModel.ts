import Sequelize from 'sequelize'
import { getAsync, redis, setAsync } from '../../../src/config/configRedis'
import database from '../../shared/database/config'
import { badRequest, notFound } from '../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../shared/errors/missing-param-error'
import CommentModel, { type Comment } from './CommentModel'

interface Post {
  id: string
  text: string
  comments?: Comment[]
}
class PostModel {
  posts: any

  constructor () {
    this.posts = database.define('posts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    this.posts.hasMany(CommentModel.comments, {
      as: 'comments',
      foreignKey: 'idPost',
      sourceKey: 'id'
    })
    this.posts.sync({ force: false })
  }

  async create (post: string): Promise<void> {
    await this.posts.create({ text: post })
  }

  async getPosts (): Promise<any> {
    let posts = await getAsync('posts')
    if (posts) {
      return JSON.parse(posts)
    }

    posts = await this.posts.findAll({
      attributes: ['id', 'text'],
      include: [
        {
          model: CommentModel.comments,
          as: 'comments',
          attributes: ['id', 'text', 'idPost']
        }
      ]
    })

    return posts
  }

  async getPost (id: string): Promise<Post> {
    if (!id) {
      return notFound(new MissingParamError(id))
    }

    const postFromCache = await getAsync(`post:${id}`)
    if (postFromCache) {
      return JSON.parse(postFromCache)
    }

    const post = await this.posts.findOne({
      where: { id },
      attributes: ['id', 'text'],
      include: [
        {
          model: CommentModel.comments,
          as: 'comments',
          attributes: ['id', 'text', 'idPost']
        }
      ]
    })

    await setAsync(`post:${id}`, JSON.stringify(post))

    return post
  }

  async update (id: string, text: string): Promise<Post> {
    if (!id) {
      return badRequest(new MissingParamError(id))
    }

    const post = await getAsync(`post:${id}`)
    if (post) {
      await setAsync(`post:${id}`, JSON.stringify({ ...JSON.parse(post), text }))
    }

    await this.posts.update({ text }, { where: { id } })

    return { id, text }
  }

  async delete (id: string): Promise<Post> {
    if (!id) {
      return badRequest(new MissingParamError(id))
    }

    const post = await getAsync(`post:${id}`)
    if (post) {
      await redis.del(`post:${id}`)
    }

    await this.posts.destroy({ where: { id } })

    return { id, text: '' }
  }
}

export default new PostModel()
