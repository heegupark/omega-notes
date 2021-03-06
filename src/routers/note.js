const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs');
const Note = require('../models/note')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/api/notes', auth, async (req, res) => {
  const owner = req.user ? req.user._id : null
  const note = new Note({
    ...req.body,
    owner
  })

  try {
    await note.save()
    res.status(201).send(note)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/api/notes', auth, async (req, res) => {
  const sort = {}
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  try {
    const note = await Note.find({ owner: req.user }).sort(sort).populate().exec()
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/api/notes/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const note = await Note.findOne({ _id, owner: req.user._id })

    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/api/notes/image/:path', auth, (req, res) => {
  const folder = `./public/notes/${req.params.path}`;
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({
    limits: {
      fileSize: 10000000
    },
    storage: storage,
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(gif|GIF|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        return cb(new Error('Please upload a .jpg, .gif, .jpeg, or .png file'));
      }
      cb(undefined, true);
    }
  }).single('image');
  upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          message: `Failed to upload an image:${error.message}`
        });
      } else {
        try {
          sharp(req.file.path)
            .resize({ width: 100 })
            .withMetadata()
            .toFile(`${folder}/thumbnail-${req.file.filename}`)
          return res.status(201).json({
            message: 'File uploaded and resized successfully',
            filename: `thumbnail-${req.file.filename}`
          });
        } catch (error) {
          return res.status(400).json({
            message: `Failed to resize an image:${error.message}`
          });
        }
        // return res.status(200).json({ message: 'File uploaded successfully'});
      }
  });
});

router.patch('/api/notes/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'imgUrl', 'thumbnailImgUrl', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id })
    if (!note) {
      return res.status(404).send()
    }

    updates.forEach((update) => note[update] = req.body[update])
    await note.save()

    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/api/notes/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
