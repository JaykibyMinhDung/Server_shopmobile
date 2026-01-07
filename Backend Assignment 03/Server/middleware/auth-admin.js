// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser's populated req.cookies instead of fragile header splitting
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Verify using the dynamic secret, not the hardcoded one
    const data = jwt.verify(token, getJwtSecret());

    // Check if role is admin to be safe (though this middleware is for admin routes)
    if (!data) {
      throw new Error("Invalid token data");
    }
    // Optional: Check role here if needed, but the original code just checked for presence
    // In controller/admin/auth.js, role is checked during login.
    // Ideally we should check role here too.
    if (data.role !== 'admin') {
         throw new Error("Unauthorized role");
    }

    req.userId = data.id;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Mật khẩu đăng nhập chưa đúng, vui lòng thử lại" });
  }
};
