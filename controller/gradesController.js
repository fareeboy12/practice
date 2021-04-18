const db = require("../models");

exports.getGrades = (req, res) => {
	db.Grade.find().sort({_id:1})
    .then((grades) =>{
        // console.log(res);
        res.status(200).json(grades);
    });
};
