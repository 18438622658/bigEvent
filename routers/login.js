// 1.加载express
// 2.创建路由对象
// 3.把接口挂在到路由对象上
// 4.到出路由对象
const path = require('path');
const db = require(path.join(__dirname, '../utils/db.js'));
// 加密模块
const utility = require('utility');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
//------------------写接口----------------------

// 注册
router.post('/reguser', async (req, res) => {
    // 接收客户端提交的 username 和password
    // console.log(req.body); 获取post请求的参数

    // 对密码进行加密
    req.body.password = utility.md5(req.body.password);
    // 写一条insert语句 插入数据库
    let r = await db('insert into user set ?', req.body);
    // console.log(r); // 成功的结果是一个对象  失败的结果是undefined 
    //做出响应
    if (r && r.affectedRows > 0) {
        // 成功
        res.send({
            status: 0,
            message: '注册成功'
        })
    } else {
        // 失败
        res.send({
            status: 1,
            message: '注册失败'
        })
    }
});

//登录
router.post('/login', async (req, res) => {
    // 通过req.body 获取用户输入的账号密码
    let username = req.body.username;
    let password = utility.md5(req.body.password);
    // 判断账号密码是否正确
    let r = await db('select * from user where username=? and password=?', [username, password]);
    // console.log(r);
    // 生成token  把用户保存的数据，放到了req.user的变量上
    if (r && r.length > 0) {
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + jsonwebtoken.sign({
                    username: req.body.username,
                    id: r[0].id,
                    // 保存用户id 用于查看用户信息
                },
                'bigevent', {
                    expiresIn: '2 days'
                })
        });
    } else {
        res.send({
            status: 1,
            message: '登录失败'
        });
    }
})
module.exports = router;