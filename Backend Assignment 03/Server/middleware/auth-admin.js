// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser to robustly get the token
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }
  try {
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
