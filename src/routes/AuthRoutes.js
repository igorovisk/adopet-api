const { Router } = require("express");
const router = Router();
// const { authCheck } = require("../middlewares/authMiddleware");

const { login } = require("../controllers/AuthController");

router.post("/", (req, res) => {
   login(req, res);
});

module.exports = router;
