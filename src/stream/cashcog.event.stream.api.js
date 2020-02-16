var https = require('https');
var apiStream = require('api-stream');
var mysql = require('mysql');
var apiURL = 'https://cashcog.xcnt.io/stream';

var dbConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "xcnt"
});

dbConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = apiStream.createApi(constructorOptions => (query, done) => {
    https.get(apiURL, res => {

        if (res.statusCode !== 200) {
            done({ status: res.statusCode }, null);
            return;
        }

        res.on('data', data => {
            try {
                let event = JSON.parse(data.toString())

                let employeeSql = `INSERT IGNORE INTO employees 
                (uuid, first_name, last_name) 
                VALUES ('${event.employee.uuid}', '${event.employee.first_name}', '${event.employee.last_name}')`;

                dbConnection.query(employeeSql, function (err, result) {
                    if (err) throw err;
                    console.log("1 employee record inserted");
                });

                let eventSql = `INSERT INTO events 
                (uuid, description, created_at, amount, currency, employee, status) 
                VALUES ('${event.uuid}', '${event.description}', '${event.created_at}', ${event.amount}, '${event.currency}', '${event.employee.uuid}', 'PENDING')`;

                dbConnection.query(eventSql, function (err, result) {
                    if (err) throw err;
                    console.log("1 event record inserted");
                });
            } catch (e) {
                console.log(e);
            }
        });

        res.on('end', () => {
            done(null, "DONE");
            dbConnection.end();
        });
    });
});