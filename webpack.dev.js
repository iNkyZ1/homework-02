const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
		],
	},
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		historyApiFallback: true,
	},
});
