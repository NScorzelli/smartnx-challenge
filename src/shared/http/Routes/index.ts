import { Router } from 'express'
import CreatePostService from '../../../modules/models/services/CreatePostService'
import CreateCommentService from '../../../modules/models/services/CreateCommentService'
const routes = Router()

routes.post('/post', CreatePostService.create)
routes.post('/comment', CreateCommentService.create)

export default routes
