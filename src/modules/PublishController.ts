import Posts from "src/modules/Posts"
import { Request, Response } from "express"

export class PublishController {
    public async createPost(req: Request, res: Response): Promise<void> {
        const { post } = req.body

        // const newPost = await Publish.create(post);
        // return res.status(201).json(newPost);
    }
}


