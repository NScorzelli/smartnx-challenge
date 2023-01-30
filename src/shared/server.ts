import cors from 'cors'
import express from 'express'
import routes from './http/Routes'

const port = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
  console.log(`Server is running on port ${port} 🚀`)
}
)
