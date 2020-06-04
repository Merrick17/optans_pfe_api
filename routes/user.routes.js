const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getUsers);
router.get('/admins', userController.getAllAdmins)
router.get('/:id', userController.getUser)
router.post('/login', userController.loginUser)
router.post('/register', userController.register)
router.delete('/:id/delete', userController.deleteUser)
router.put('/:id/update', userController.updateUser)

module.exports = router
