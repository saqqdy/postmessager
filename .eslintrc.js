const { simple: config } = require('eslint-config-sets')
module.exports = Object.assign(config, {
    extends: ['eslint:recommended', '@vue/typescript/recommended', '@vue/prettier', '@vue/prettier/@typescript-eslint', 'plugin:jsdoc/recommended'],
    rules: {
        semi: [2, 'never']
    }
})
