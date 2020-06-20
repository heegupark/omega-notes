const express = require('express')
const Note = require('../models/note')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/notes', auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: req.user._id
  })

  try {
    await note.save()
    res.status(201).send(note)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/notes/guest', async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: null
  })

  try {
    await note.save()
    res.status(201).send(note)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/notes', auth, async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  try {
    await req.user.populate({
      path: 'notes',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.notes)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/notes/guest', async (req, res) => {
  const match = {}
  const sort = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
    match.owner = null
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  try {
    const note = await Note.find({ owner: null }).populate({
      path: 'notes',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).exec()
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/notes/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const note = await note.findOne({ _id, owner: req.user._id })

    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/notes/guest/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const note = await note.findOne({ _id, owner: null })

    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/notes/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const note = await note.findOne({ _id: req.params.id, owner: req.user._id })
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

router.delete('/notes/:id', auth, async (req, res) => {
  try {
    const note = await note.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!note) {
      return res.status(404).send()
    }
    res.send(note)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
