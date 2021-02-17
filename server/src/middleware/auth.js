const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const requireAuth = (req, res, next) => {
	const accessToken = req.header("Authorization") || req.get("token") || req.body.token || req.query.token;
    
	if (accessToken) {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				next(createError(err.message));
				// res.status(404).send(err.message);
			} else {
				next();
			}
		});
	} else {
		next(createError("token not have"));
	}
};

module.exports = { requireAuth };
