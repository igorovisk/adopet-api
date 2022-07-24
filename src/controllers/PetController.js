const Pet = require("../../models/Pet.js");
const { petSchema } = require("../../schemas/PetSchema");

const getAll = async function (req, res) {
   try {
      const pets = await Pet.find({});
      return res.status(200).json(pets);
   } catch (err) {
      return res.status(500).json({ message: err.message });
   }
};

const createPet = async function (req, res) {
   const { name, owner, description } = req.body;

   try {
      const checkIfPetIsValid = await petSchema.validate(req.body);

      if (checkIfPetIsValid.error) {
         throw new Error(checkIfPetIsValid.error);
      }

      const doesPetExists = await Pet.exists({ name: name, owner: owner });

      if (!doesPetExists) {
         const newPet = { name, owner, description };

         await Pet.create(newPet);
         res.status(200).send(newPet);
      } else {
         throw new Error("pet já existente");
      }
   } catch (err) {
      console.log(err);
      res.status(401).send({ error: err.message });
   }
};

// const deletePet = async function (req, res) {
//    const { email } = req.body;
//    const doesUserExist = await User.exists({ email: email });
//    if (email) User.deleteOne(doesUserExist);
// };

module.exports = {
   getAll,
   createPet,
   //    deleteUser,
};
