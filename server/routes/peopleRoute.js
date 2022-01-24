const {Router} = require('express')
const router = Router()
const peopleController = require('../controller/peopleController')
const authMiddleware = require('../middleware/authMiddleware')
const fileMiddleware = require('../middleware/fileMiddleware')

router.get('/', authMiddleware, peopleController.getAll )
router.post('/', fileMiddleware.single('image') , authMiddleware, peopleController.create)
router.delete('/:id', peopleController.delete)


module.exports = router