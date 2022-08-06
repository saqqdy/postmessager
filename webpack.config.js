const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const watch = process.env.BUILD_WATCH === 'true'
const config = require('./config')
const plugins = [new ProgressBarPlugin()]

const baseConfig = {
	mode: 'production',
	watch,
	target: 'web',
	entry: {
		index: ['./src/index.ts'],
		'index.min': ['./src/index.ts']
	},
	output: {
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].js',
		libraryTarget: 'umd',
		libraryExport: 'default',
		library: 'PostMessager',
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
	resolve: {
		extensions: config.extensions,
		alias: config.alias,
		modules: ['node_modules']
	},
	externals: config.externals,
	performance: {
		hints: false
	},
	stats: {
		children: false
	},
	optimization: {
		minimize: !watch,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				include: /min/,
				parallel: true,
				extractComments: false
			}),
			// 注意位置，必须放在 TerserPlugin 后面，否则生成的注释描述会被 TerserPlugin 或其它压缩插件清掉
			new webpack.BannerPlugin({
				entryOnly: true, // 是否仅在入口包中输出 banner 信息
				banner: config.bannerText
			})
		]
	},
	plugins
}

module.exports = [
	merge(baseConfig, {
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					include: process.cwd(),
					exclude: config.jsexclude,
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									loose: false,
									modules: 'auto',
									useBuiltIns: 'usage',
									corejs: 3,
									targets: [
										'> 0.1%',
										'last 2 versions',
										'not IE < 11'
									]
								}
							]
						]
					}
				}
			]
		}
	})
]
