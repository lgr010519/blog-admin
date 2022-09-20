const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/v1', {
            target: 'http://127.0.0.1:7001',
            changeOrigin: true,
            pathRewrite: {
                "^/api/v1": "/"
            },
        }),
    );
};