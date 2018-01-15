const router = require('express').Router()
const answer = require('../controllers/answerController')
const checkAuth = require('../middleware/checkAuth')

router.post('/', checkAuth.isLogin, answer.create)
router.get('/questions/:id', answer.findByQuestionId)
router.get('/', answer.findAll)
router.get('/:id', answer.findById)
router.put('/:id', checkAuth.isLogin, answer.update)
router.delete('/:id', checkAuth.isLogin, answer.delete)

module.exports = router