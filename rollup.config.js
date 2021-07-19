const fs = require('fs')
const path = require('path')
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json'

let fileList = []
const readDir = entry => {
    const dirInfo = fs.readdirSync(entry)
    dirInfo.forEach(item => {
        const name = path.join(entry, item)
        const info = fs.statSync(name)
        if (info.isDirectory()) {
            readDir(name)
        } else {
            let fileName = name.split('/').reverse()
            ;/^[\S]*\.js$/.test(fileName[0]) && getInfo(name)
        }
    })
}
const getInfo = url => {
    fileList.push(url)
}
readDir('./src')

const production = !process.env.ROLLUP_WATCH

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'POSTMESSAGER',
            file: 'lib/index.umd.js',
            format: 'umd'
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            babel({ babelHelpers: 'inline' }),
            production && terser()
        ]
        // external: ['core-js', '@babel/runtime']
    },
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.main,
                format: 'cjs'
            },
            {
                file: 'lib/index.esm.js',
                format: 'es'
            }
        ],
        plugins: [babel({ babelHelpers: 'bundled' })],
        external: ['core-js']
    },
    {
        input: fileList,
        output: [
            {
                // file: 'lib/[name].js',
                dir: 'lib',
                preserveModules: true,
                preserveModulesRoot: 'src',
                exports: 'auto',
                format: 'cjs',
                // format: 'iife', // immediately-invoked function expression — suitable for <script> tags
                sourcemap: false
            }
        ],
        plugins: [babel({ babelHelpers: 'bundled' })],
        external: ['core-js']
    }
]
