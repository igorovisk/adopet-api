const { Router } = require("express");
const router = Router();
const { authCheck } = require("../middlewares/authMiddleware");

const {
   getAll,
   createUser,
   deleteUser,
} = require("../controllers/UserController");

router.get("/", (req, res) => {
   getAll(req, res);
});

router.post("/", async (req, res) => {
   createUser(req, res);
});

router.delete("/", authCheck, async (req, res) => {
   deleteUser(req, res);
});

module.exports = router;
