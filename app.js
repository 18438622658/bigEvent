const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('express-jwt');
const app = express();

app.listen(3007, () => {
    console.log('大事件启动')
})

// ----------配置应用级别的中间件---------------
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
// 解析token字符串 控制哪些模块必须登录才能访问  jwt是头部引入的一个组件变量
// 把用户保存的数据，放到了req.user的变量上
app.use(jwt({
    secret: 'bigevent'
}).unless({
    path: /^\/api/
}))
// /^\/api/ 以/api开头  unless 除...之外
// --------------------加载路由模块--------------
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));

// 错误处理中间件  必须是4个参数
// 每个错误err 都有自己的name 和 message 
app.use(function (err, req, res, next) {
    // console.log(err.name); // 错误的名字
    // console.log(err.message); // 错误的提示
    if (err.name === 'UnauthorizedError') {
        console.log(err); // 错误的提示
        // 如果错误的名字是 UnauthorizedError，则表示是token相关的错误
        res.status(401).send({
            status: 1,
            message: '身份认证失败！'
        });
    }
});