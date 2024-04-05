const express = require("express")
const router = express.Router()
const operations = require("../controllers/UsersController")

const { checkToken } = require('../middleware/checkToken')

router.get('/', operations.getAllUsers)

router.post('/register', operations.registerUser)

router.post('/login', operations.LoginUser)

router.delete('/delete/:id', checkToken, operations.deleteUser)

router.patch('/update/:id', checkToken, operations.updateUser)
module.exports = router;