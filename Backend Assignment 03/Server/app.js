const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer"); // gói về download and upload file

const app = express();
const url = "mongodb://127.0.0.1:27017/Assignment3";

const authRoutes = require("./routes/user/auth");
const productRoutes = require("./routes/user/products");
const chatRoutes = require("./routes/chat/chat");

const adminRoutesAuth = require("./routes/admin/auth");
const adminRoutesOrder = require("./routes/admin/history");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().setTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // set cookie for this url
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true); // accept send anything from client
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie"
  ); // , Accept, X-Requested-With, Origin
  // res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]); // set cookie from server for private url
  next();
});

// admin
app.use(adminRoutesAuth);
app.use(adminRoutesOrder);

app.use(authRoutes);
app.use(productRoutes);
app.use(chatRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: "Server error", SatusCode: 500 });
});

mongoose
  .connect(url)
  .then((results) => {
    const server = app.listen(5000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
