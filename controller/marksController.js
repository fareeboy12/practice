const db = require("../models");

exports.updateMarks = (req, res) => {
    db.Mark.updateOne(
        {
            student: req.body.stid,
            head : req.body.headid
        },
        {
            $set : {marks: req.body.marks}
        },
    ).then(res =>{
        console.log(res);
    });


};
