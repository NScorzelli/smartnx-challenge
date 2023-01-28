import { Request, Response } from 'express';
import CommentModel from '../models/CommentModel';


export class CreateCommentService {
    async create(req: Request, res: Response): Promise<Response> {
        const { comment, idPost } = req.body;
        const newComment = await CommentModel.create(comment, idPost);

        return res.status(201).json(newComment)
    }
}

export default new CreateCommentService()
