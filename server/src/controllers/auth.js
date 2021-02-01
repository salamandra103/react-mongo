const createError = require("http-errors");
const jwt = require("jsonwebtoken");

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
	} else {
		if (err.message === "invalide email") {
			errors.email = "Неправильный адрес почты";
		}
	
		if (err.message === "invalide password") {
			errors.password = "Неправильный пароль";
		}
	}

	return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToket = (id) => jwt.sign({ id }, process.env.TOKEN_SECRET, {
	expiresIn: maxAge,
});

exports.signUpPost = (req, res, next) => {
	const { email, password } = req.body;

	User.create({ email, password }, (err, data) => {
		if (err) {
			res.status(404).send(handleErrors(err));
		} else {
			res.status(201).json({ user: data._id });
		}
	});
};

exports.loginPost = async(req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToket(user._id);
		if (!token) {
			res.status(500).send(handleErrors(new Error("Неправильный токе")));
		}
		res.json({ token });
	} catch (err) {
		res.status(404).send(handleErrors(err));
	}
};
