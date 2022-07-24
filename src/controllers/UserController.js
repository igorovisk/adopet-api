const User = require("../../models/User.js");
const { encrypt } = require("../utils/crypto");

const getAll = async function (req, res) {
   try {
      const users = await User.find({});
      return res.status(200).json(users);
   } catch (err) {
      return res.status(500).json({ message: err.message });
   }
};

const createUser = async function (req, res) {
   const { name, email, password, tel } = req.body;

   try {
      const doesUserExist = await User.exists({ email: email });

      if (!doesUserExist) {
         let encryptedPassword;
         await encrypt(password).then((res) => {
            encryptedPassword = res;
         });
         const newUser = { name, email, password: encryptedPassword, tel };

         await User.create(newUser);
         res.status(200).send(newUser);
      } else {
         throw new Error("usuário já existente");
      }
   } catch (err) {
      console.log(err);
      res.status(401).send({ error: err.message });
   }
};

const deleteUser = async function (req, res) {
   const { email } = req.body;
   const doesUserExist = await User.exists({ email: email });
   if (email) User.deleteOne(doesUserExist);
};

module.exports = {
   getAll,
   createUser,
   deleteUser,
};
