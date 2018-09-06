module.exports = {
    env: {
        browser: true,
        node: true
    },
    globals: {
        chrome: true
    },
    rules: {
        'no-console': 0,
        'no-empty': [1, { 'allowEmptyCatch': true }]
    },
    extends: 'airbnb-base'
};
