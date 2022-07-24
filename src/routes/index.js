const userRoutes = require("./UserRoutes");
const authRoutes = require("./AuthRoutes");
const petRoutes = require("./PetRoutes");

module.exports = {
   users: userRoutes,
   auth: authRoutes,
   pets: petRoutes,
};
