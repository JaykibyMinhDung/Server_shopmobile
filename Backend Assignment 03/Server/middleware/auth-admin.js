const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use req.cookies provided by cookie-parser for robust access
  // Fallback to manual parsing only if necessary (though req.cookies is preferred)
  let token = req.cookies?.admin_token;

  if (!token && req.headers.cookie) {
     // Fallback for cases where cookie-parser might not run or for some edge cases,
     // but we look specifically for admin_token
     const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
        const [key, val] = cookie.trim().split('=');
        acc[key] = val;
        return acc;
     }, {});
     token = cookies['admin_token'];
  }

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
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
