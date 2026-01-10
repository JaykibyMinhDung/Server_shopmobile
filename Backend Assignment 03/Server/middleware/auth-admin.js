const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use req.cookies provided by cookie-parser instead of fragile header parsing
  const token = req.cookies.admin_token;

  if (!token) {
    return res.status(403).json({ message: "Bạn chưa đăng nhập tài khoản admin" });
  }

  try {
    const data = jwt.verify(token, getJwtSecret());

    // Check for admin role
    if (data.role !== "admin") {
         return res.status(403).json({ message: "Tài khoản không phải admin" });
    }

    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
