const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Cabeçalho de autorização ausente!" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Formato de cabeçalho de autorização inválido!" });
  }

  const token = tokenParts[1];

  console.log(token);
  if (!token) return res.status(401).json({ message: "Acesso negado!" });


    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      console.log(decode);
      if (decode.admin) console.log("Você é um adm");
      if (decode.logged) {
        console.log("Acesso Concedido!");
        next();
      }

      if(err) return res.status(400).json({ message: "Token Inválido" });
    });
    
};

module.exports = { checkToken };
