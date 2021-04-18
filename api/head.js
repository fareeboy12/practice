const router = require("express").Router();
const Controller = require("../controller");

router.get("/", Controller.Head.getHead);

module.exports = router;
