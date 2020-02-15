var https = require('https');
var apiStream = require('api-stream');
var apiURL = 'https://cashcog.xcnt.io/single';

module.exports = apiStream.createApi(constructorOptions => (query, done) => {
    https.get(apiURL, res => {
        var response = '';

        if (res.statusCode !== 200) {
            done({ status: res.statusCode }, null);
            return;
        }

        res.on('data', d => response += d);
        res.on('end', () => done(null, JSON.parse(response)));
    });
});