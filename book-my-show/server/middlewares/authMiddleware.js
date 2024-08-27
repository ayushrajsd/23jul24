const jwt = require("jsonwebtoken"); // common js module

const auth = (req, res, next) => {
  try {
    // console.log("middleware");
    // console.log("req.headers", req.headers.authorization); // Bearer asdas.asda.asdasdd
    const token = req.headers.authorization.split(" ")[1]; // extracting token from Bearer token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = verifiedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Token Invalid" });
  }
};

module.exports = auth;
