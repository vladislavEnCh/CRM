const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
        
      })
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    })
  }
}


module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    const password = req.body.password
    const hashPassword = await bcrypt.hash(password, 5)
    
    const user = new User({
      email: req.body.email,
      password: hashPassword
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}