module.exports = (sql, params = null) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'bigevent'
    });
    conn.connect();

    return new Promise((resolve, reject) => {
        // 执行异步代码  成功结果交给resolve

        // 完成增删改查
        conn.query(sql, params, (err, result) => {
            err ? reject(err) : resolve(result);
        });

        conn.end();
    }).catch(err => {
        console.log(err.sqlMessage);
    })

}