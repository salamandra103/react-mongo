const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: "main.js",
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "resolve-url-loader",
						options: {},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
							// outputPath: path.join(__dirname, "src/assets/images/"),
							// publicPath: path.join(__dirname, "src/assets/images/")
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./dist/index.html",
		}),
		new Dotenv(),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		watchContentBase: true,
		progress: true,
		historyApiFallback: true,
	},
};
