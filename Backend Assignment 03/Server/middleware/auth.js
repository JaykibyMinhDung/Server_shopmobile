// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // console.log(req.headers);
  // const authHeader = req.get("Authorization");
  // const token = authHeader.split(" ")[1];

  // Sentinel Fix: Use cookie-parser req.cookies for robust parsing
  const value = req.cookies.client_token;

  // || !authHeader
  if (!value) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }
  try {
    const data = jwt.verify(value, getJwtSecret());
    // const vetifyToken = jwt.verify(token, "ASSIGNMENT3$");
    // || !vetifyToken
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
