const {
  registerController,
  loginController,
} = require("../controllers/UserController");
const checkLogin = require("../middleware/checkLogin");

const router = require("express").Router();

router.post("/register", registerController);

router.post("/login", loginController);
router.get("/hello", checkLogin ,(req, res) => {
  res.json({ msg: "hit route" });
});
module.exports = router;
