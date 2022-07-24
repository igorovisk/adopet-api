const { Router } = require("express");
const router = Router();
const { authCheck } = require("../middlewares/authMiddleware");

const {
   getAll,
   createPet,
   deletePet,
} = require("../controllers/PetController");

router.get("/", (req, res) => {
   getAll(req, res);
});

router.post("/", async (req, res) => {
   createPet(req, res);
});

router.delete("/", authCheck, async (req, res) => {
   deletePet(req, res);
});

module.exports = router;
