const router = require("express").Router();
const Controller = require("../controller");

router.get("/marks", Controller.Student.getStudentMarks);

module.exports = router;
