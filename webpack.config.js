const { resolve } = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'generateData.js',
		path: resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	externals: {
		lodash: {
			commonjs: 'lodash',
			commonjs2: 'lodash',
			amd: 'lodash',
			root: '_'
		}
	},
	mode: 'production',
	devtool: 'source-map'
}