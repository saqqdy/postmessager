module.exports = {
    presets: [
        [
            '@babel/env',
            {
                loose: false,
                modules: 'auto',
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        '@babel/typescript'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        '@babel/plugin-proposal-class-properties'
        // '@babel/plugin-transform-runtime'
    ]
}
