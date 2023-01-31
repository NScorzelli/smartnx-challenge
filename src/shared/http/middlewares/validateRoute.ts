import { type NextFunction, type Request, type Response } from 'express'
import { badRequest } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'

const validateRoute = (req: Request, res: Response, next: NextFunction): any => {
  const { method, path } = req
  const { body, params } = req

  if (method === 'POST' && path === '/post') {
    const { text } = req.body
    if (!text) res.send(badRequest(new MissingParamError(text)))
  } else if (method === 'POST' && path === '/comment') {
    const { text, idPost } = req.body
    if (!text || !idPost) res.send(badRequest(new MissingParamError('text or postId')))
  } else if (method === 'GET' && path.startsWith('/post/')) {
    const { id } = params
    if (!id) return res.send(badRequest(new MissingParamError('id')))
  } else if (method === 'PATCH' && path.startsWith('/post/')) {
    const { title, content } = body
    if (!title || !content) res.send(badRequest(new MissingParamError('title or content')))
  } else if (method === 'DELETE' && path.startsWith('/post/')) {
    const { id } = params
    if (!id) res.send(badRequest(new MissingParamError('id')))
  } else if (method === 'DELETE' && path.startsWith('/comment/')) {
    const { id } = params
    if (!id) res.send(badRequest(new MissingParamError('id')))
  }

  next()
}

export default validateRoute
