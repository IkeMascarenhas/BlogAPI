const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json({ users: allUsers });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name) {
    return res.status(422).json({ message: "O nome é obrigatório!" });
  }

  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }

  const UserExists = await User.findOne({ email: email });

  if (UserExists) {
    res.status(422).json({ message: "Esse usuário já existe, utilize outro email!" });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPass,
  });

  try {
    console.log(user);
    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Ocorreu um erro" });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }

  const user = await User.findOne({ email });

  if (!user) return res.status(422).json({ message: "Usuário não encontrado" });

  const checkPassword = await bcrypt.compare(password, user.password);
  console.log(checkPassword);

  if (!checkPassword) return res.status(422).json({ message: "Senha inválida!" });

  try {
    const token = jwt.sign(
      {
        id: user._id,
        logged:true,
        user: user.name
      },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const user = await User.findOne({ _id:id });

  if (!user) {
    return res.json({ message: "O usuário não existe!" });
  }

  console.log(user);
  await User.deleteOne({ _id:id });
  res.json("Usuário excluído com sucesso!");
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findOne({_id:id})

  if(!user) return res.status(404).json({message:"Usuário não encontrado!"})

  try{
    const updatedUser = await User.findByIdAndUpdate(id, {name, email: email ? email : user.email, password: password ? password : user.password}, {new: true})
    res.status(200).json({message: "Usuário atualizado", updatedUser})
  } catch(err){
    console.log(`Ocorreu um erro: ${err}`)
  }


}

module.exports = { registerUser, getAllUsers, LoginUser, deleteUser, updateUser };
