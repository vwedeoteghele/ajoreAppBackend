const User = require('../models/user')
const Department = require('../models/department')
const Company = require('../models/company')
const Ajore = require('../models/ajore')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()



class UserController {
//create admin
async createAdmin(req, res) {
  try {
    const {firstName, lastName, email, password, companyName} = req.body
    let role
    if(!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({email: email.toLowerCase().trim()})
    if(oldUser) {
      return res.status(409).send('user already exists, Please login')
    }
    let companyCheck = await Company.findOne({companyName})
    let companyID 
    if(companyCheck) {
      role = 'regular'
      companyID = companyCheck._id
    } else {
      role = 'admin'
      let company = new Company({
        companyName,
        email
        // admin: [newUser._id]
      })
    
      company = await company.save()
     
      companyID = company._id
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
  
  let newUser = new User({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
    role,
    companyID
  })

   newUser = await newUser.save()
 
console.log(companyID)
    await Company.updateOne(
      {_id: companyID},
      {
        $addToSet: {
          admin: newUser._id
        }
      }
    )
   
  let newCompany = await Company.findById(companyID)
  const response = {
    admin: newUser,
    company: newCompany
  }

  res.status(200).json({
    status: "success",
    message: "admin successfully created",
    data: response
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

async loginAdmin(req, res) {

  try {
    
    const {email, password} = req.body
    if(!(email && password)) {
      return res.status(400).send("email and password are required")

    }

    //check if the user exist
    const userExists = await User.findOne({email: email.toLowerCase().trim()})

    if(!userExists) {
      return res.status(400).send("provide correct email and password")
    }

    //if user exists in db, compare password in db with input password
    const match = await bcrypt.compare(password, userExists.password)
    if(!match) {
      return res.status(400).send("provide correct email and password")
    }

    //if email and password are correct, create a signed token for the user
    const token = jwt.sign({
      user_id: userExists._id,
      companyID: userExists.companyID,
      email
    }, process.env.TOKEN_KEY , { expiresIn: '2h' });
    console.log(token);
    userExists.token = token
    res.status(200).json({
      status: "success",
      message: "login successfully ",
      data: userExists,
      token
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

async createDepartment(req, res) {
  try {
    const {departmentName, companyID} = req.body

    let newDept = new Department({
      departmentName,
      companyID
    })
    newDept = await newDept.save()
    
    res.status(200).json({
      status: "success",
      message: "Department successfully created",
      data: newDept
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

async createAjore(req, res) {
  try {
    const {companyID, ajoreName} = req.body
    
    let newAjore = new Ajore({
      ajoreName,
      companyID
    })
    newAjore = await newAjore.save()
    res.status(200).json({
      status: "success",
      message: "Department successfully created",
      data: newAjore
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

async employeesAjore(req, res) {
  try {
    const {companyID} = req.params
    const getEmployeesAndAjore =await Employee.find(
      {companyID},

    ).populate("ajore")

    res.status(200).json({
      status: "success",
      message: "ajore fetched successfully ",
      data: getEmployeesAndAjore
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

module.exports = UserController