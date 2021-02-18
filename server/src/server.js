const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const port = process.env.PORT;
app.set("port", port);

const server = http.createServer(app);

mongoose.set("useCreateIndex", true);

mongoose.connect("mongodb://localhost:27017/reactdb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	connectTimeoutMS: 1000,
	socketTimeoutMS: 1000,
}, (err) => {
	if (err) {
		return console.log(err);
	}
	server.listen(port, () => {
		console.log("Server started");
	});

	server.on("error", (err) => {
		throw err;
	});
});
