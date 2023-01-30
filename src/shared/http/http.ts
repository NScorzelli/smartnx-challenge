import { Request, Response } from 'express'


export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
}