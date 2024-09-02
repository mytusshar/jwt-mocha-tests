const request = require('request')

const httpReq = {};

httpReq.getData = (callBack) => {
    // Request URL
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    request(url, (error, response, body) => {
        callBack(error, response);
    });
};

httpReq.getDataPromise = () => {
    // Request URL
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if(error) reject(error);
            else resolve(response);
        });
    });
};



module.exports = httpReq;
