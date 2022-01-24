const {Router} = require('express')
const router = Router()
const userRoute = require('./userRoute')
const peopleRoute = require('./peopleRoute')
const birthdayRoute = require('./birthdayRoute')


router.use('/user', userRoute)
router.use('/people', peopleRoute)
router.use('/birthday', birthdayRoute)

module.exports = router