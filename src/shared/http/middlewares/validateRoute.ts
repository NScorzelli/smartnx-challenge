import { type NextFunction, type Request, type Response } from 'express'
import { badRequest } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'

const validateRoute = (req: Request, res: Response, next: NextFunction): any => {
  const { method, path } = req
  const { body, params } = req

  switch (true) {
    case method === 'POST' && path === '/post': {
      const { title, content } = body
      if (!title || !content) res.send(badRequest(new MissingParamError('title or content')))
      break
    }
    case method === 'POST' && path === '/comment': {
      const { content, postId } = body
      if (!content || !postId) res.send(badRequest(new MissingParamError('content or postId')))
      break
    }
    case method === 'GET' && path === '/posts': break
    case method === 'GET' && path.startsWith('/post/'): {
      const { id } = params
      if (!id) return res.send(badRequest(new MissingParamError('id')))
      break
    }
    case method === 'PATCH' && path.startsWith('/post/'): {
      const { title, content } = body
      if (!title || !content) res.send(badRequest(new MissingParamError('title or content')))
      break
    }
    case method === 'DELETE' && path.startsWith('/post/'): {
      const { id } = params
      if (!id) res.send(badRequest(new MissingParamError('id')))
      break
    }
    case method === 'DELETE' && path.startsWith('/comment/'): {
      const { id } = params
      if (!id) res.send(badRequest(new MissingParamError('id')))
      break
    }
  }

  next()
}

export default validateRoute
