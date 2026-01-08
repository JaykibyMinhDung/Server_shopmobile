const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use req.cookies provided by cookie-parser instead of fragile header parsing
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Verify using the shared secret function instead of hardcoded string
    const data = jwt.verify(token, getJwtSecret());

    // Check for admin role explicitly if it's in the token (defensive coding)
    if (data.role && data.role !== 'admin') {
         throw new Error('Not authorized');
    }

    if (!data) {
      throw new Error('Invalid token data');
    }

    req.userId = data.id;
    req.userRole = data.role; // Useful for downstream
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
