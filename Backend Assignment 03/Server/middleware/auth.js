const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use req.cookies provided by cookie-parser instead of fragile header parsing
  const token = req.cookies?.client_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    const data = jwt.verify(token, getJwtSecret());

    if (!data) {
      throw new Error('Invalid token data');
    }

    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
