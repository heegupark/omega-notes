const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// const multer = require('multer')
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb) {
//     // if (!file.originalname.endsWith('.pdf')) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('Please upload a Word ducoment'))
//     }

//     cb(undefined, true)
//     // cb(new Error('File must be a PDF'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   }
// })

// app.post('/upload', upload.single('upload'), upload.single('upload'), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send( {error: error.message} )
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//
// without middleware: new request        ->        run route handler
//
// with middleware:    new request        ->        do something        ->      run route handler
//

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
