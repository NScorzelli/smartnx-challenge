import { Router } from 'express'
import CreateCommentService from '../../../modules/models/services/CreateCommentService'
import CreatePostService from '../../../modules/models/services/CreatePostService'
import validateRoute from '../middlewares/validateRoute'
const routes = Router()

routes.post('/post', validateRoute, CreatePostService.create)
routes.post('/comment', validateRoute, CreateCommentService.create)

routes.get('/posts', validateRoute, CreatePostService.getPosts)
routes.get('/post/:id', validateRoute, CreatePostService.getPostById)

routes.patch('/post/:id', validateRoute, CreatePostService.update)

routes.delete('/post/:id', validateRoute, CreatePostService.delete)

routes.delete('/comment/:id', validateRoute, CreateCommentService.deleteComment)

export default routes
