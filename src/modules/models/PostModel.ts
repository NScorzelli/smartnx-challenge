import Sequelize from 'sequelize'
import { getAsync, redis, setAsync } from '../../config/redis'
import database from '../../shared/database/config'
import { notFound } from '../../shared/errors/helper/http-helper'
import CommentModel from './CommentModel'

interface Post {
  id: string
  text: string
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
    const postFromCache = await getAsync(`post:${id}`)
    if (postFromCache) {
      return JSON.parse(postFromCache)
    }

    const post = await this.posts.findOne({
      where: { id },
      attributes: ['id', 'text']
    })

    if (!post) {
      return notFound(Error('Post not found'))
    }

    await setAsync(`post:${id}`, JSON.stringify(post))

    return post
  }

  async update (id: string, text: string): Promise<Post> {
    const postFromCache = await getAsync(`post:${id}`)
    if (postFromCache) {
      await setAsync(`post:${id}`, JSON.stringify({ ...JSON.parse(postFromCache), text }))
    }

    await this.posts.update({ text }, { where: { id } })

    return { id, text }
  }

  async delete (id: string): Promise<Post> {
    const postFromCache = await getAsync(`post:${id}`)
    if (postFromCache) {
      await redis.del(`post:${id}`)
    }

    await this.posts.destroy({ where: { id } })

    return { id, text: '' }
  }
}

export default new PostModel()
