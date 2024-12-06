const jwt = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      lastname: user.lastname,
    },
    process.env.JWT_KEY
  );
  return accessToken;
};

module.exports = jwtManager;
