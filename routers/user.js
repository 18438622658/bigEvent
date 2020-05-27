// 1.加载express
// 2.创建路由对象
// 3.把接口挂在到路由对象上
// 4.到出路由对象

const express = require('express');
const router = express.Router();
//------------------写接口----------------------
// 获取用户信息接口
router.get('/userinfo', (req, res) => {
    // let r = await db('select * from user where id=?')
    // login.js中的jwt把用户的token 中的信息放到了req.user里 此时可以取出来
    console.log(req.user);
})
module.exports = router;