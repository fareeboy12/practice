const db = require("../models");

exports.getHead = (req, res) => {
	db.Head.find().sort({ hid: 1 })
    .then((head) =>{
        res.status(200).json(head);
    });
};
