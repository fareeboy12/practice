const db = require("./models");

// db.Student.aggregate([
// 	{
// 		$lookup: {
// 			from: "marks",
// 			localField: "regno",
// 			foreignField: "regno",
// 			as: "scores",
// 		},
// 	},
// 	// {
// 	// 	$unwind: "$scores",
// 	// },
// ]).then((students) => {
// 	console.log(students);
	
// });

// db.Head.find().sort({ hid: 1 }).then((res) =>{
//     console.log(JSON.stringify(res));
// });

// db.Grade.find().sort({gradeid:1})
//     .then((res) =>{
//         console.log(res);
//         // res.status(200).json(head);
//     });

db.Mark.updateOne(
    {
        student: 1,
        head : 1
    },
    {
        $set : {marks: 3}
    },
).then(res =>{
    console.log(res);
});
