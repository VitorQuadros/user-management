const express = require("express");
const router = express.Router();
const HomeController = require("../src/controllers/HomeController");
const UserController = require("../src/controllers/UserController");

router.get("/", HomeController.index);

router.post("/user", UserController.create);
router.get("/user", UserController.index);
router.get("/user/:id", UserController.findUser);
router.put("/user", UserController.edit);
router.delete("/user/:id", UserController.remove);
router.post("/recover", UserController.recoverPassword);
router.post("/changepassword", UserController.changePassword);

module.exports = router;