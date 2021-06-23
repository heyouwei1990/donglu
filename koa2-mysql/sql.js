var mysql = require('mysql');
var config = {
    host: '101.132.121.124',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'donglu'
}
var db = function(sql, params) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        connection.connect(function(error) {
            if (error) {
                return reject(error);
            }
            connection.query(sql, params, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(data);
                }
            })
            connection.end(function(err) {
                if (err) {
                    return reject(err)
                }
            })

        })

    })
}
module.exports = db;