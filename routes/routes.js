const express = require("express");
const app = express();
const router = express.Router();
const HomeController = require("../src/controllers/HomeController");

router.get("/", HomeController.index);

module.exports = router;