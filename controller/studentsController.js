const db = require("../models");

exports.getStudentMarks = (req, res) => {
	db.Student.aggregate([
		{
			$lookup: {
				from: "marks",
				localField: "_id",
				foreignField: "student",
				as: "scores",
			},
		},
		// {
		// 	$unwind: "$scores",
		// },
	]).then((students) => {
		console.log(students);
		res.status(200).json(students);
	});
};
