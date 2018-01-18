const router = require('express').Router()
const user = require('../controllers/userController')
const checkAuth = require('../middleware/checkAuth')

router.post('/', user.signupOrLogin)
router.get('/', user.findAll)
router.get('/profile', checkAuth.isLogin,  user.findById)
router.put('/:id', checkAuth.isLogin,  user.update)
router.delete('/:id', checkAuth.isLogin,  user.delete)

module.exports = router
