import { Request, Response } from 'express'
import PostModel from '../../database/models/PostModel'; 

export class CreatePostService {
    async create(req: Request, res: Response): Promise<Response> {
        const { text } = req.body;
        const newPost = await PostModel.create(text);

        return res.status(201).json(newPost)
    }
}

export default new CreatePostService()