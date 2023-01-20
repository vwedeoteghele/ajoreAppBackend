const express = require('express')
const router = express.Router()
const auth = require('../middleware/authorization')
const UserController = require('../controllers/userController')
const { createAdmin, loginAdmin, createDepartment, createAjore,employeesAjore} = new UserController()


router.post('/register', createAdmin)
router.post('/login', loginAdmin)
router.post('/createDepartment', auth, createDepartment)
router.post('/createAjore', auth, createAjore)
router.get('/employeesAjore',employeesAjore)
//routeto get employee and their ajore group

module.exports = router