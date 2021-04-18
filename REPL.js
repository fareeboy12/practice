const db = require("./models");

db.Student.aggregate([
	{
		$lookup: {
			from: "marks",
			localField: "regno",
			foreignField: "regno",
			as: "scores",
		},
	},
	// {
	// 	$unwind: "$scores",
	// },
]).then((students) => {
	console.log(students);
	
});
