import { Router } from 'express'
import CreatePostService from '../../../modules/models/services/CreatePostService'
import CreateCommentService from '../../../modules/models/services/CreateCommentService'
const routes = Router()

routes.post('/post', CreatePostService.create)
routes.post('/comment', CreateCommentService.create)

routes.get('/posts', CreatePostService.getPosts)
routes.get('/post/:id', CreatePostService.getPostById)

routes.patch('/post/:id', CreatePostService.update)

routes.delete('/post/:id', CreatePostService.delete)

routes.delete('/comment/:id', CreateCommentService.delete)

export default routes
