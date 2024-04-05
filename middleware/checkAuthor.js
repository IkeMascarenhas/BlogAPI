const jwt = require('jsonwebtoken')
const Post = require('../models/Post')
const User = require('../models/User')

const checkAuthor = async (req, res, next) => {
    const { id } = req.params;
    const { idUser} = req.body;

    const post = await Post.findById(id)
    const user = await User.findById(idUser)

    if(!user) return res.status(404).json({message:"Usuário não encontrado!"})

    if(post.author != user.name){
        res.status(401).json({message: "Você não pode realizar essa ação!"})
    }
    
    next()
}

module.exports = { checkAuthor }