const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/api/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/api/users/signin', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).json({ user, token })
  } catch(e) {
    // res.status(400).json({ message: 'failed to verify user credential.'})
    res.status(400).json(e)
  }
})

router.post('/api/users/signout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.json({status: 'signedout'})
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user)
})

module.exports = router
