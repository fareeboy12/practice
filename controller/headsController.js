const db = require("../models");

exports.getHead = (req, res) => {
	db.Head.find().sort({ _id: 1 })
    .then((head) =>{
        res.status(200).json(head);
    });
};
