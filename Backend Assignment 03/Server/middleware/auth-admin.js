const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser for reliable cookie extraction
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    const data = jwt.verify(token, getJwtSecret());

    // Strict role check to prevent privilege escalation
    if (!data || data.role !== "admin") {
      throw new Error("Unauthorized");
    }

    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
