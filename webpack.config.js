const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	module: {
		rules: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.js$/, loader: 'babel-loader' },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
		]
	},
	devServer: {
		contentBase: './dist/index.html',
		port: '8080'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new VueLoaderPlugin()
	],
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		}
	},
}