const createError = require("http-errors");
const User = require("../models/user");

const handleErrors = (err) => {
	const errors = { email: "", password: "" };

	if (err.code === 11000) {
		errors.email = "Данная почта уже занята";
		return errors;
	}

	if (err.message.includes("user validation failed")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

exports.signUpGet = (req, res, next) => {
	res.send("signUpGet");
};

exports.signUpPost = (req, res, next) => {
	const { email, password } = req.body;

	User.create({ email, password }, (err, data) => {
		if (err) {
			res.status(404).send(handleErrors(err));
		} else {
			res.status(201).json({ email, password });
		}
	});
    
	// res.send("signUpPost");
};

exports.loginGet = (req, res, next) => {
	res.send("loginGet");
};

exports.loginPost = (req, res, next) => {
	res.send("loginPost");
};
