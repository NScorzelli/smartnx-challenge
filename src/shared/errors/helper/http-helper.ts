import { HttpResponse } from '../../http/http'
import { request, Request, Response } from 'express' 

export const badRequest = (error: Error): any => ({
  statusCode: 400,
  body: error
})


export const notFound = (error: Error): any => ({
  statusCode: 404,
  body: error
})



export const ok = (data: any): any => (
  {
    statusCode: 200,
    body: data
  }
)


export const noContent = (): any => ({
  statusCode: 204,
  body: null
})