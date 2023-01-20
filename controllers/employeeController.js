const Employee = require('../models/employee')
const bcrypt = require('bcryptjs')

class EmployeeController {

  async createEmployee(req, res) {
    try {
      const {firstName, lastName, email, password, companyID, departmentID} = req.body
     
      if(!(email && password && firstName && lastName)) {
        res.status(400).send("All input is required");
      }
      const oldEmployee = await Employee.findOne({email: email.toLowerCase().trim()})
      if(oldEmployee) {
        return res.status(409).send('employee already exists, Please login')
      }
   
      const encryptedPassword = await bcrypt.hash(password, 10)
      
    let newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      companyID,
      departmentID
    })
  
    newEmployee = await newEmployee.save()

    res.status(200).json({
      status: "success",
      message: "employee successfully created",
      data: newEmployee
    })
    } catch (error) {
      console.log(error);
      res.status(500)
      .json({
        status: "FAILED",
        message: "Something went wrong"
      })
    }
  }

  async loginEmployee(req, res, next) {

    try {
      const {email, password} = req.body
      if(!(email && password)) {
        return res.status(400).send("email and password are required")
  
      }

      const employeeExists = await Employee.findOne({email: email.toLowerCase().trim()})
  
      if(!employeeExists) {
        return res.status(400).send("provide correct email and password")
      }
  console.log(employeeExists);
      //if employee exists in db, compare password in db with input password
      const match = await bcrypt.compare(password, employeeExists.password)
      if(!match) {
        return res.status(400).send("provide correct email and password")
      }
  
      //if email and password are correct, create a signed token for the user
      const token = jwt.sign({
        employeeID: employeeExists._id,
        companyID: employeeExists.companyID,
        email
      }, process.env.TOKEN_KEY , { expiresIn: '2h' });
  
      res.status(200).json({
        status: "success",
        message: "employee successfully created",
        data: employeeExists,
        token
      })
      // userExists.token = token
      // res.status(201).json(userExists)
  
    } catch (error) {
      console.log(error);
      res.status(500)
      .json({
        status: "FAILED",
        message: "Something went wrong"
      })
    }
  
  }

  async joinAjore(req, res) {
    try {
      const {ajoreID} = req.params
      const {employeeID} = req.params
      //check if ajore exists
      let ajoreExists = await Ajore.findById(ajoreID)
      if(!ajoreExists) {
        return res.status(400)
        .json({
          status: "FAILED",
          message: "Could not find ajore group"
        })
      }
      let updateEmployee =await Employee.updateOne(
        {_id: employeeID},
        {
          $addToSet: {
            ajore: ajoreID
          }
        }
      )

      res.status(200).json({
        status: "success",
        message: "employee successfully joined ajore",
        // data: employeeExists,
        
      })
    } catch (error) {
      console.log(error);
      res.status(500)
      .json({
        status: "FAILED",
        message: "Something went wrong"
      })
    }
  }
  
}

module.exports = EmployeeController