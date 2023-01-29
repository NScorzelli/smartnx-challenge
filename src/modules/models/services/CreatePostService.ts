import { Request, Response } from 'express'
import PostModel from '../PostModel'; 

interface Post {
    text: string;
}

export class CreatePostService {
    async create(req: Request, res: Response): Promise<Response> {
        const { text } = req.body as Post;

        if (!text) {
            return res.status(400).json({message: 'Text is required!'})
        }

        await PostModel.create(text);

        return res.status(201).json({message: 'Post created!'})
    }

    async getPosts(req: Request, res: Response): Promise<Response> {
        const posts = await PostModel.getPosts();

        return res.status(200).json(posts);
    }

    async getPostById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: 'Valid id is required'})
        }

        const post = await PostModel.getPost(id);

        if (!post || post === null) {
            return res.status(404).json({message: 'Post not found!'})
        }

        return res.status(200).json(post);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { text } = req.body as Post;


        console.log(id, text)

        if(!id) {
            return res.status(400).json({message: 'Valid id is required'})
        }

        if(!text) {
            return res.status(400).json({message: 'Text is required'})
        }

        const post = await PostModel.getPost(id);

        if (!post || post === null) {
            return res.status(404).json({message: 'Post not found!'})
        }

        await PostModel.update(id, text);

        return res.status(200).json({message: 'Post updated!'})
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({message: 'Valid id is required'})
        }

        const post = await PostModel.getPost(id);

        if (!post || post === null) {
            return res.status(404).json({message: 'Post not found!'})
        }

        await PostModel.delete(id);

        return res.status(200).json({message: 'Post deleted!'})
    }
}


export default new CreatePostService()