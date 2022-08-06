import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const config = require('./config')

// const production = !process.env.ROLLUP_WATCH

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				banner: config.banner
			},
			{
				file: pkg.module,
				format: 'es',
				banner: config.banner
			}
		],
		plugins: [
			resolve({ extensions: config.extensions }),
			commonjs(),
			typescript({
				tsconfigOverride: {
					compilerOptions: {
						declaration: false,
						target: 'es5'
					},
					include: ['src/**/*'],
					exclude: ['node_modules', '__tests__', 'core-js']
				},
				abortOnError: false
			}),
			babel({
				babelHelpers: 'bundled',
				extensions: config.extensions,
				// exclude: [/\/core-js\//],
				// runtimeHelpers: true,
				sourceMap: true
			})
		],
		external(id) {
			return ['core-js', 'core-js'].some(k =>
				new RegExp('^' + k).test(id)
			)
		}
	}
]
