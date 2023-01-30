import { type Request, type Response } from 'express'
import { badRequest, notFound, ok } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'
import CommentModel from '../CommentModel'

interface Comment {
  comment: string
  idPost: number
}
export class CreateCommentService {
  async create (req: Request, res: Response): Promise<Response> {
    const { comment, idPost } = req.body as Comment

    if (!comment || !idPost) {
      return res.send(badRequest(new MissingParamError('comment or idPost')))
    }

    await CommentModel.create(comment, idPost)

    return res.send(ok(comment))
  }

  async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      return res.send(badRequest(new Error('Comment not found!')))
    }

    const comment = await CommentModel.getCommentById(id)

    if (!comment || comment === null) {
      return res.send(notFound(new Error('Comment not found!')))
    }

    await CommentModel.deleteComment(id)

    return res.send(ok(comment))
  }
}

export default new CreateCommentService()
