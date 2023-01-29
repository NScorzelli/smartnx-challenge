import Sequelize from 'sequelize'
import database from '../../shared/database/config'
import CommentModel from './CommentModel'
import { redis, getAsync, setAsync } from '../../../src/config/configRedis'

class PostModel {
    posts: any;

    constructor() {
        this.posts = database.define('posts', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
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
        this.init();
    }    

    async init () { 
        await this.posts.sync({ force: false });
    }

    async create(post: string) {
        await this.posts.create({ text: post });
    }

    async getPosts() {
        let posts = await getAsync('posts');
        if (posts) {
            return JSON.parse(posts);
        }

        posts = await this.posts.findAll({
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
        const postFromCache = await getAsync(`post:${id}`);
        if (postFromCache) {
          return JSON.parse(postFromCache);
        }
      
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
      
        await setAsync(`post:${id}`, JSON.stringify(post));
      
        return post;
      }      

    async update(id: string, text: string) {
        let post = await getAsync(`post:${id}`);
        if (post) {
            await setAsync(`post:${id}`, JSON.stringify({ ...JSON.parse(post), text }));
        }

        await this.posts.update({ text }, { where: { id } });

        return post;
    }

    async delete(id: string) {
        let post = await getAsync(`post:${id}`);
        if (post) {
            await redis.del(`post:${id}`);
        }

        await this.posts.destroy({ where: { id } });

        return post;
    }
}

export default new PostModel()
