const express = require('express')
const router = express.Router()
const auth = require('../middleware/authorization')
const EmployeeController = require('../controllers/employeeController')
const {createEmployee, loginEmployee, joinAjore} = new EmployeeController()


router.post('/createEmployee', auth, createEmployee)
router.post('/employeelogin', loginEmployee)
router.put('/joinAjore/:id', joinAjore)
module.exports = router