const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Sentinel: Improved security by using req.cookies and dynamic JWT secret
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Sentinel: Use getJwtSecret() instead of hardcoded string
    const data = jwt.verify(token, getJwtSecret());

    if (!data) {
      throw new Error("Invalid token data");
    }
    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
