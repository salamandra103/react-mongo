const createError = require("http-errors");

const Dashboard = require("../models/dashboard");

exports.dashboardGet = async(req, res, next) => {
	// const {tree} = req.body;
	// next()
	// Dashboard.create({})
	Dashboard.find({}, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};

exports.dashboardPost = (req, res, next) => {
	Dashboard.create(req.body, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json(data);
		}
	});
};

exports.dashboardPut = async(req, res, next) => {
    
};

exports.dashboardDelete = async(req, res, next) => {
	Dashboard.deleteOne({ _id: req.body.id }, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json({ id: req.body.id });
		}
	});
};
