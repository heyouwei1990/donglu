var db = require('../sql.js');
var request = require('request');
// var iconv = require('iconv-lite');
const BASEURL = 'http://www.xbiquge.la';

function ajax(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url.indexOf(BASEURL) == 0 ? url : BASEURL + url,
            method: 'GET',
            gzip: true,
            headers: {
                'Content-Type': 'text/html; charset=UTF-8',
                "Accept": "*/*",
            }
        }, (error, res, body) => {
            if (error) reject(error);
            resolve(body);
        })
    })
}
module.exports = ajax;