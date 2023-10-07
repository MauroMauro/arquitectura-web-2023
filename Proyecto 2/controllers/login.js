const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  /*
  Si la contraseña es correcta, se crea un token con el método jwt.sign. El token contiene el nombre de usuario y la identificación de usuario en un formulario firmado digitalmente
  */
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
  .status(200)
  .send({ token, username: user.username })
})

module.exports = loginRouter