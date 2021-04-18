const router = require("express").Router();
const Controller = require("../controller");

router.get("/", Controller.Grade.getGrades);

module.exports = router;
