var mysql = require("mysql");
var pool = mysql.createPool({
    host: '139.199.99.154',
    user: 'root',
    password: 'toor',
    port: '3306',
    database: 'RSFroum_test',
    charset: 'utf8',
});

let query = function(sql, options, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function(err, results, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, results, fields);
            });
        }
    });
};

let mysql_query = (sql, options) => {
    return new Promise((resolve, reject) => {
        query(sql, options, (err, result) => {
            if (err) {
                console.log('[mysql插入 失败] - ', err.message);
                reject(err)
            } else {
                console.log('-------------------------mysql_query start---------------------------');
                console.log('mysql_query ID:\n', result);
                resolve(result)
                console.log('--------------------------mysql_query end-------------------------\n\n');
            }
        })

    })
}
module.exports = mysql_query;