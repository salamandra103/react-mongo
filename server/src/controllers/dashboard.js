const createError = require("http-errors");

const Dashboard = require("../models/dashboard");

exports.dashboardGet = async(req, res, next) => {
	// const {tree} = req.body;
	// next()
	// Dashboard.create({})
};

exports.dashboardPost = (req, res, next) => {
	Dashboard.create(req.body, (err, data) => {
		if (err) {
			res.status(404).send(err);
		} else {
			res.status(201).json("Запись сохранена");
		}
	});
};

exports.dashboardPut = async(req, res, next) => {
    
};

exports.dashboardDelete = async(req, res, next) => {
    
};
