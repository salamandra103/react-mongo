const mongoose = require("mongoose");

const { Schema } = mongoose;

const mainSchema = new Schema([
	{
		id: Number,
		name: String,
		age: Number,
	},
]);

module.exports = mongoose.model("main", mainSchema);
