const twikoo = require('twikoo-netlify');

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Max-Age': '86400'
};

exports.handler = (event, context, callback) => {
    if (event.httpMethod === 'OPTIONS') {
        callback(null, {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: ''
        });
        return;
    }

    const originalCallback = (error, response) => {
        if (error) {
            callback(error);
            return;
        }
        response.headers = Object.assign({}, response.headers, CORS_HEADERS);
        callback(null, response);
    };

    const result = twikoo.handler(event, context, originalCallback);

    if (result && typeof result.then === 'function') {
        result.then(response => {
            response.headers = Object.assign({}, response.headers, CORS_HEADERS);
            callback(null, response);
        }).catch(error => {
            callback(error);
        });
    }
};
