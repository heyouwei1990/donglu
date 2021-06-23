const router = require('koa-router')();
const crypto = require('crypto');
const db = require('../sql.js');
router.post('/api/register', async(ctx, next) => {
    let params = ctx.request.body
    let name = params.userName;
    let password = params.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let nameData = await db('SELECT * FROM userList WHERE name = ?', [name]);
    if (nameData[0]) {
        ctx.body = {
            code: 0,
            message: '该用户名已存在',
            data: null,
        };
        return;
    }
    let data = await db('INSERT INTO userList (name,password,role) VALUES(?,?,?)', [name, newPas, 1])
    if (data) {
        ctx.body = {
            code: 1,
            message: '注册成功',
            data: null,
        };
    } else {
        ctx.body = {
            code: 0,
            message: '注册失败',
            data: err,
        };
    }

})
router.post('/api/login', async(ctx, next) => {
    let params = ctx.request.body
    let name = params.userName;
    let password = params.password;
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(password).digest("hex");
    let data = await db('SELECT * FROM userList WHERE name = ?', [name]);
    ctx.body = {
        code: 0,
        message: '登录失败',
        data: null,
    };
    console.log(data);
    if (data) {
        if (newPas == data[0].password) {
            ctx.body = {
                code: 1,
                message: '登录成功',
                data: null,
            };
        } else {
            ctx.body = {
                code: 0,
                message: '用户名或密码错误',
                data: null,
            };
        }
    } else {
        ctx.body = {
            code: 0,
            message: '登录失败',
            data: null,
        };
    }
})
module.exports = router