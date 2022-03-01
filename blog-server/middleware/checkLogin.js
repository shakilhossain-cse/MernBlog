const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTSECRECT_TOKEN);
    const { id, name, email, role } = decoded;
    (req.id = id), (req.name = name), (req.email = email), (req.role = role);
    next();
  } catch {
    next("Authantication Faild");
  }
};

module.exports = checkLogin;
