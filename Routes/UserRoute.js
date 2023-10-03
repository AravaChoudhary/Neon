const express = require('express')
const router = express.Router()
const Controllers = require('../Controllers/UserControllers')

router.get('/login' , Controllers.getForm)
router.post('/check' ,Controllers.showResults)



module.exports = router