import { type Request, type Response } from 'express'
import { badRequest, noContent, notFound, ok } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'
import CommentModel from '../CommentModel'

interface Comment {
  text: string
  idPost: number
}
export class CreateCommentService {
  async create (req: Request, res: Response): Promise<Response> {
    const { text, idPost } = req.body as Comment

    if (!text || !idPost) {
      return res.send(badRequest(new MissingParamError('text or idPost')))
    }

    await CommentModel.create(text, idPost)

    return res.send(ok(text))
  }

  async deleteComment (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      return res.send(badRequest(new Error('Comment not found!')))
    }

    const comment = await CommentModel.getCommentById(id)

    if (!comment || comment === null) {
      return res.send(notFound(new Error('Comment not found!')))
    }

    await CommentModel.deleteComment(id)

    return res.json(noContent())
  }
}

export default new CreateCommentService()
