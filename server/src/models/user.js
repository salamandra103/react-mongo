const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Пожалуйста введите почту"],
		unique: true,
		index: true,
		lowercase: true,
		validate: [isEmail, "Введите валидное значение почты"],
	},
	password: {
		type: String,
		required: [true, "Пожалуйста введите пароль"],
		minlength: [4, "Минимальная длинна пароля 4 символа"],
	},
});

module.exports = mongoose.model("user", userSchema);
