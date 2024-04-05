const express = require("express")
const router = express.Router()
const operations = require("../controllers/PostsController")
const { checkToken } = require("../middleware/checkToken")
const { checkAuthor } = require('../middleware/checkAuthor')


router.get('/', operations.getAllPosts)

router.post('/create/:idUser', checkToken, operations.createPost)

router.patch('/update/:id', checkToken, checkAuthor, operations.updatePost)

router.delete('/delete/:id', checkToken, checkAuthor, operations.deletePost)

module.exports=router;