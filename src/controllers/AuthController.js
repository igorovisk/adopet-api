const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { encrypt } = require("../utils/crypto");
const bcrypt = require("bcrypt");

dotenv.config();
const secret = process.env.SECRET;

const login = async function (req, res) {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({
         email: email,
      });

      if (!user) throw new Error("Usuário inexistente ou senha inválida");
      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword)
         throw new Error("Usuário inexistente ou senha inválida");

      const token = await jwt.sign(
         { email: email, password: user.password },
         secret,
         {
            expiresIn: 3000,
         }
      );

      return res.status(200).json({
         email: email,
         token,
      });
   } catch (err) {
      console.log(err);
      res.status(401).send({ error: err.message });
   }
};

module.exports = { login };
