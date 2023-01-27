import  {PostsModel, CommentModel} from '../database'

interface Posts {
    id: number
    post: string
    userId: string
    comments?: Comment[]
}

interface Comment extends Posts {
    idPost: [string]
    comment: [string]
    idComment: [string]
}

export default Posts