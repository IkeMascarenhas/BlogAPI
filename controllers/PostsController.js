const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')
const User = require('../models/User')
// router.get('/:quantity', )


const getAllPosts = async (req, res) => {
    const allPosts = await Post.find({})
    res.status(200).json({allPosts})
}

const createPost = async (req, res) => {
    const {idUser} = req.params
    const {text, info} = req.body;

    if(!idUser) return res.json({message:"É necessário fornecer o ID do usuário que criou o post"})
    if(!text) return res.status(422).json({message:"O texto é obrigatório!"})


    const user = await User.findById(idUser)

    if(!user) return res.json({message: "O usuário não existe!"})
    console.log(user.name)

    const post = new Post({
        author: user.name,
        text,
        info
    })

    try {
        console.log(`Texto: ${text} \n Info: ${info}`)
        await post.save()
        await User.updateOne({_id:idUser}, {$push: {AuthorOf: post}})
        res.status(201).json({ message: "Post criado com sucesso" });
        const all = User.find({})
        console.log(all)
    } catch (error) {
        res.status(401).json({message:"Ocorreu um erro!"})
        console.log(error.message)
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const { text, info } = req.body;
    

    const post = await Post.findById(id)

    if(!post) return res.status(404).json({message:"Esse post não existe!"})

    try{
        await Post.updateOne({_id:id}, {
            text: text ? text : post.text, 
            info: info ? info : post.info
        })
        res.status(200).json({message: "Post atualizado!"})
    } catch(err) {
        console.log("Deu erro!" + err)
    }
}

const deletePost = async (req, res) => {
    const {id} = req.params;
    const {idUser} = req.params;
    if(post.author != user.name){
        res.status(401).json({message: "Você não pode realizar essa ação!"})
    }

    const post = await Post.findById(id)

    if(!post) return res.status(404).json({message: "O post não existe!"})

    try {
        await Post.findByIdAndDelete(id)
        res.json({message: "O post foi excluído!"})
    } catch (error) {
        res.status(500).json({message: "O post não foi excluído!"})
    }
}

module.exports = { getAllPosts, createPost, updatePost, deletePost }