const twikooHandler = require('twikoo-netlify').handler;

exports.handler = async (event, context) => {
      // 处理 OPTIONS 预检请求
      if (event.httpMethod === 'OPTIONS') {
                return {
                              statusCode: 200,
                              headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Access-Control-Allow-Headers': 'Content-Type',
                                                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                              },
                              body: ''
                };
      }

      // 调用原始的 Twikoo handler
      const response = await twikooHandler(event, context);

      // 添加 CORS 头
      response.headers = response.headers || {};
      response.headers['Access-Control-Allow-Origin'] = '*';
      response.headers['Access-Control-Allow-Headers'] = 'Content-Type';
      response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';

      return response;
};
