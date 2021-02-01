const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const requireAuth = (req, res, next) => {
	const token = req.header("Authorization") || req.get("token") || req.body.token || req.query.token;
    
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
			if (err) {
				next(createError(err.message));
			} else {
				next();
			}
		});
	} else {
		next(createError("token not have"));
	}
};

module.exports = { requireAuth };
