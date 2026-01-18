const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser's req.cookies instead of manual parsing which is fragile
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Use the secure secret retrieval function instead of hardcoded "ASSIGNMENT3$"
    const data = jwt.verify(token, getJwtSecret());

    if (!data) {
      throw new Error("Verification failed");
    }
    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
