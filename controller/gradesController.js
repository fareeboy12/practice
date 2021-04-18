const db = require("../models");

exports.getGrades = (req, res) => {
	db.Grade.find().sort({gradeid:1})
    .then((grades) =>{
        // console.log(res);
        res.status(200).json(grades);
    });
};
