import { type NextFunction, type Request, type Response } from 'express'
import { badRequest } from '../../../shared/errors/helper/http-helper'
import { MissingParamError } from '../../../shared/errors/missing-param-error'

const validateRoute = (request: Request, response: Response, next: NextFunction): void => {
  const { method, path } = request
  const { body, params } = request

  switch (true) {
    case method === 'POST' && path === '/post': {
      const { title, content } = body
      if (!title || !content) badRequest(new MissingParamError('title or content'))
      break
    }
    case method === 'POST' && path === '/comment': {
      const { content, postId } = body
      if (!content || !postId) badRequest(new MissingParamError('content or postId'))
      break
    }
    case method === 'GET' && path === '/posts': break
    case method === 'GET' && path.startsWith('/post/'): {
      const { id } = params
      if (!id) return badRequest(new MissingParamError('id'))
      break
    }
    case method === 'PATCH' && path.startsWith('/post/'): {
      const { title, content } = body
      if (!title || !content) badRequest(new MissingParamError('title or content'))
      break
    }
    case method === 'DELETE' && path.startsWith('/post/'): {
      const { id } = params
      if (!id) badRequest(new MissingParamError('id'))
      break
    }
    case method === 'DELETE' && path.startsWith('/comment/'): {
      const { id } = params
      if (!id) badRequest(new MissingParamError('id'))
      break
    }
  }

  next()
}

export default validateRoute
