import { type Request, type Response } from 'express'
import { noContent, ok } from '../../../shared/errors/helper/http-helper'
import PostModel from '../PostModel'

interface Post {
  text: string
}

export class CreatePostService {
  async create (req: Request, res: Response): Promise<Response> {
    const { text } = req.body as Post
    await PostModel.create(text)

    return res.send(ok(text))
  }

  async getPosts (_: Request, res: Response): Promise<Response> {
    const posts = await PostModel.getPosts()
    return res.send(ok(posts))
  }

  async getPostById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const post = await PostModel.getPost(id)
    return res.send(ok(post))
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { text } = req.body as Post
    await PostModel.update(id, text)

    return res.send(ok(text))
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    await PostModel.delete(id)
    return res.send(noContent())
  }
}

export default new CreatePostService()
