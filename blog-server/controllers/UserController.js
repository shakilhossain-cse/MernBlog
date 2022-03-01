const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const emailRegex =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "All Feild is Required" });
  }
  const valid = emailRegex.test(email);
  if (!valid)
    return res
      .status(400)
      .json({ success: false, msg: "Your Email is Not Valid" });

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res
      .status(400)
      .json({ success: false, msg: "Your Email is Allready Exiset" });
  }
  const hash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hash,
  });
  await newUser.save();
  res.status(200).json({
    success: true,
    msg: "Registered Successfull.",
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const valid = emailRegex.test(email);
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "All Feild is Required" });
  }
  if (!valid) {
    return res
      .status(400)
      .json({ success: false, msg: "Your email is not valid" });
  }
  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    return res
      .status(400)
      .json({ success: false, msg: "Authintication Faild!" });
  }
  const comparePassword = await bcrypt.compare(password, oldUser.password);
  if (!comparePassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Your password is not matched" });
  }
  //   genarate token
  var token = jwt.sign(
    {
      id: oldUser._id,
      name: oldUser.name,
      email: oldUser.email,
      role: oldUser.role,
    },
    process.env.JWTSECRECT_TOKEN,
    { expiresIn: "1h" }
  );
  res
    .status(200)
    .json({ access_token: token, msg: "your are login successfully" });
  console.log(comparePassword);
};

module.exports = { registerController, loginController };
