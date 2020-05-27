const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.listen(3000, () => {
    console.log('大事件启动')
})

// ----------配置应用级别的中间件---------------
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

// --------------------加载路由模块--------------
app.use('/api', require(__dirname, 'routers', 'login'));
app.use('/my/article', require(__dirname, 'routers', 'category'));
app.use('/my/article', require(__dirname, 'routers', 'article'));
app.use('/my', require(__dirname, 'routers', 'user'));