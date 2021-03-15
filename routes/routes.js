const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../src/controllers/HomeController");
const UserController = require("../src/controllers/UserController");

router.get("/", HomeController.index);

router.post("/user", UserController.create);

module.exports = router;