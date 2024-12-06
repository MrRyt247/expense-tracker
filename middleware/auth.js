const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwtPayload = jwt.verify(accessToken, process.env.JWT_KEY);
    req.user = jwtPayload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized!",
    });
    return;
  }
  next();
};

module.exports = auth;
