const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../../util/auth");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.json({
      meta: { message: "Hãy điền email và mật khẩu", statusCode: 0 },
    });
  }

  let AddCookieUser;
  User.findOne({ email: email })
    .then((user) => {
      // NOTE: Original code checked !email && !password here inside the promise,
      // but it's better to check before the DB call.
      // However, to minimize changes, I will focus on the execution flow logic.

      if (!user) {
        // Explicitly throw an error to break the promise chain and go to .catch
        // OR return a specific value that the next .then can handle.
        // Returning res.json() creates a response object, which is truthy.
        // We MUST NOT proceed to bcrypt.compare if user is invalid.
        res.status(403).json({ meta: { message: "Đăng nhập thất bại", statusCode: 0 } });
        return null; // Stop chain logic
      }

      if (user.role < 1) {
        res.json({
          meta: { message: "Tài khoản không phải admin", statusCode: 0 },
        });
        return null; // Stop chain logic
      }

      AddCookieUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      // If previous step returned null (response already sent), stop here.
      if (isMatch === null) {
        return;
      }

      if (!isMatch) {
        return res.status(401).json({
          meta: { message: "Mật khẩu đăng nhập không đúng", statusCode: 0 },
        });
      }

      const token = jwt.sign(
        { id: AddCookieUser._id, role: "admin" },
        getJwtSecret()
      );

      return res
        .cookie("admin_token", token, {
          maxAge: 86400 * 1000,
          httpOnly: true, // Chặn đọc cookie bên client
          secure: process.env.NODE_ENV === "Assignment",
        })
        .status(200)
        .json({
          data: {
            id: AddCookieUser._id,
            fullname: AddCookieUser.fullName,
            role: AddCookieUser?.role,
            email: email,
            cookie: token,
          },
          meta: {
            message: "Đăng nhập thành công",
            statusCode: 1,
          },
        });
    })
    .catch((err) => {
      console.error(err);
      if (!res.headersSent) {
         return res.json({
          meta: {
            message: "Đăng nhập thất bại",
            statusCode: 0,
          },
        });
      }
    });
};

exports.getAllUser = (req, res, next) => {
  User.find()
    .then((user) => {
      return res.json({
        data: {
          inforUser: user,
          amountUser: user.length,
        },
        meta: {
          message: "Nhận dữ liệu từ tất cả người dùng thành công",
          statusCode: 1,
        },
      });
    })
    .catch(() => {
      res.json({
        meta: {
          message: "Nhận dữ liệu thất bại",
          statusCode: 0,
        },
      });
    });
};

exports.logout = (req, res, next) => {
  return res
    .status(200)
    .clearCookie("admin_token")
    .json({
      meta: { message: "Tài khoản đã đăng xuất", statusCode: 1 },
    });
};
