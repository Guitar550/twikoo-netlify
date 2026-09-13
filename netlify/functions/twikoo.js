 exports.handler = (event, context, callback) => {
    const CORS_HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Max-Age': '86400'
    };

    if (event.httpMethod === 'OPTIONS') {
        callback(null, {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: ''
        });
        return;
    }

    callback(null, {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: 'Test CORS', method: event.httpMethod })
    });
};
