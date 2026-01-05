// sẽ có một số API không cần phải đăng nhập cũng có thể lấy được dữ liệu như API trả về dữ liệu cho Homepage hay lấy thông tin cụ thể một sản phẩm.
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../util/auth");

module.exports = (req, res, next) => {
  // Use cookie-parser for reliable cookie retrieval
  // instead of fragile header splitting that fails with multiple cookies
  const token = req.cookies && req.cookies.admin_token;

  if (!token) {
    return res.status(403).json({ message: "bạn chưa đăng nhập tài khoản" });
  }

  try {
    // Verify using the dynamic secret instead of hardcoded "ASSIGNMENT3$"
    const data = jwt.verify(token, getJwtSecret());

    if (!data) {
      throw new Error("Invalid token");
    }

    // Security Enhancement: Ensure the token belongs to an admin
    // This is critical now that we share the same secret key for all tokens
    if (data.role !== "admin") {
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
