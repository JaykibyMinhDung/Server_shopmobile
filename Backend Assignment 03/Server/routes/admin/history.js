const express = require("express");

const router = express.Router();

const auth = require("../../middleware/auth");
const histories = require("../../controller/admin/history");

router.get("/histories/all", auth, histories.getAllHistory);

module.exports = router;
