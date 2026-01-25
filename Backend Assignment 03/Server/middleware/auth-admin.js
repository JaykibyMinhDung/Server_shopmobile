// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use req.cookies provided by cookie-parser for robust access
  // This prevents issues with cookie ordering and simplifies retrieval
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Verify using the centralized secret instead of hardcoded string
    const data = jwt.verify(token, getJwtSecret());

    if (!data) {
      throw new Error("Token verification failed");
    }

    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
