var mysql = require('mysql');
var config = {
    host: '服务器IP',
    user: '用户名',
    password: '密码',
    port: '端口号',
    database: '表的名字'
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
