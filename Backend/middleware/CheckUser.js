const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("No token");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.send(req.user);
    next();
  } catch (err) {
    return res.status(401).send("Access Denied");
  }
};

module.exports = verify;