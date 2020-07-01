require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const noteRouter = require('./routers/note')

const app = express()

const https = require('https')
const fs = require('fs')

app.use(express.json())
app.use(userRouter)
app.use(noteRouter)

if (process.env.ENV === 'DEV') {
  app.listen(process.env.PORT, () => {
    console.log(`[http] Server listening on port ${process.env.PORT}`)
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
