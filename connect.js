const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'btvn_node',
    // để có thể truy vấn nhiều lần trong 1 câu lệnh 
    multipleStatements: true
})

conn.connect(function(err) {
    if (err) return new Error('Khong the ket noi toi CSDL');
})

module.exports = conn;