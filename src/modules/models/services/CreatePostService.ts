import { type Request, type Response } from 'express'
import { badRequest, noContent, notFound, ok } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'
import PostModel from '../PostModel'

interface Post {
  text: string
}

export class CreatePostService {
  async create (req: Request, res: Response): Promise<Response> {
    const { text } = req.body as Post

    if (!text) {
      return res.send(badRequest(new MissingParamError('text')))
    }

    await PostModel.create(text)

    return res.send(ok(text))
  }

  async getPosts (_: Request, res: Response): Promise<Response> {
    const posts = await PostModel.getPosts()

    if (!posts || posts === null) {
      return res.send(notFound(new Error('Posts not founds!')))
    }
    return res.send(ok(posts))
  }

  async getPostById (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      return res.send(badRequest(new MissingParamError('id')))
    }

    const post = await PostModel.getPost(id)

    if (!post || post === null) {
      return res.send(notFound(new Error('Post not found!')))
    }

    return res.send(ok(post))
  }

  async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { text } = req.body as Post

    console.log(id, text)

    if (!id) {
      return res.send(badRequest(new MissingParamError('id')))
    }

    if (!text) {
      return res.send(badRequest(new MissingParamError('text')))
    }

    const post = await PostModel.getPost(id)

    if (!post || post === null) {
      return res.send(notFound(new Error('Post not found!')))
    }

    await PostModel.update(id, text)

    return res.send(ok(text))
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      return res.send(badRequest(new MissingParamError('id')))
    }

    const post = await PostModel.getPost(id)

    if (!post || post === null) {
      return res.send(notFound(new Error('Post not found!')))
    }

    await PostModel.delete(id)

    return res.send(noContent())
  }
}

export default new CreatePostService()
