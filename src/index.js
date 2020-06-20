const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const https = require('https')
const fs = require('fs')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

if (process.env.ENV === 'DEV') {
  app.listen(process.env.PORT, () => {
    console.log('[http] Server listening on port', process.env.PORT)
  })
} else if (process.env.ENV === 'LIVE') {
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/city.heegu.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/city.heegu.net/fullchain.pem')
  },
    app).listen(process.env.PORT, () => {
      console.log(`[https] Server listening on port ${process.env.PORT}`)
    });
}
