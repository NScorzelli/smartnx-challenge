import { Request, Response } from 'express';
import CommentModel from '../CommentModel';

interface Comment {
    comment: string;
    idPost: number;
}
export class CreateCommentService {
    async create(req: Request, res: Response): Promise<Response> {
        const { comment, idPost } = req.body as Comment;

        if (!comment || !idPost) {
            return res.status(400).json({message: 'Comment is required!' || 'idPost is required!'})
        }

        await CommentModel.create(comment, idPost);

        return res.status(201).json({message: 'Comment created!'})
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: 'Valid id is required'})
        }

        const comment = await CommentModel.getCommentById(id);

        if (!comment || comment === null) {
            return res.status(404).json({message: 'Comment not found!'})
        }

        await CommentModel.deleteComment(id);

        return res.status(200).json({message: 'Comment deleted!'})
    }
}

export default new CreateCommentService()
