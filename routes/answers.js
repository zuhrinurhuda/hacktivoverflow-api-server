const router = require('express').Router()
const answer = require('../controllers/answerController')

router.post('/', answer.create)
router.get('/', answer.findAll)
router.get('/:id', answer.findById)
router.put('/:id', answer.update)
router.delete('/:id', answer.delete)

module.exports = router