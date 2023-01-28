import { Router } from 'express'
import CreatePostService from '../../../../src/modules/services/CreatePostService'
const routes = Router()

routes.post('/post', CreatePostService.create)

export default routes
