const router = require('express').Router()
const user = require('../controllers/userController')

router.post('/', user.create)
router.get('/', user.findAll)
router.get('/:id', user.findById)
router.put('/:id', user.update)
router.delete('/:id', user.delete)

module.exports = router
