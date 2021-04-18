const router = require("express").Router();
const Controller = require("../controller");

router.post("/save", Controller.Mark.updateMarks);

module.exports = router;
