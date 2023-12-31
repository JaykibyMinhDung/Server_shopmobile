const express = require("express");
const router = express.Router();

const auth = require("../../controller/admin/auth");

const firewall = require("../../middleware/auth");

router.post("/users", auth.login);

router.get("/users/all", firewall, auth.getAllUser);

router.get("/logout", firewall, auth.logout);

// router.put("/chatrooms/addMessage", firewall, chatroom.addNewMessage);

module.exports = router;
