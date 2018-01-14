const router = require('express').Router()
const question = require('../controllers/questionController')

router.post('/', question.create)
router.get('/', question.findAll)
router.get('/:id', question.findById)
router.put('/:id', question.update)
router.delete('/:id', question.delete)

module.exports = router