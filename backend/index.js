const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const videosRouter = require('./routes/api')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api/videos', videosRouter)
app.use('/videos', express.static('videos'))

app.get('/', (req, res) => res.send('Backend OK'))

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`))
