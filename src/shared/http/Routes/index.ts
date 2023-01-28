import { Router } from 'express'
import CreatePostService from '../../../../src/modules/services/CreatePostService'
import CreateCommentService from '../../../../src/modules/services/CreateCommentService'
const routes = Router()

routes.post('/post', CreatePostService.create)
routes.post('/comment', CreateCommentService.create)

export default routes
