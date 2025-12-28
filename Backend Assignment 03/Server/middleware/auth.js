// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser's populated req.cookies
  // Based on controller/user/auth.js, the user token is "client_token"
  const token = req.cookies?.client_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }
  try {
    const data = jwt.verify(token, getJwtSecret());
    if (!data) {
      throw Error;
    }
    req.userId = data.id;
    next();
  } catch {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
