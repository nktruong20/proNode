const conn = require('../connect');
var Account = {
    getAll: (cd) => {
        conn.query('SELECT * FROM accounts ORDER BY id DESC', cd);
    },
    getById: (id, cd) => {
        conn.query('SELECT * FROM accounts WHERE id = ?', [id], cd);
    },

    create: (data, cd) => {
        conn.query('INSERT INTO accounts SET ?', [data], cd);
    },
    update: (data, id, cd) => {
        conn.query('UPDATE accounts SET ? WHERE id = ?', [data, id], cd);
    },
    destroy: (id, cd) => {
        conn.query('DELETE FROM accounts WHERE id = ?', [id], cd);
    },
    checkEmail: (email, cd) => {
        conn.query('SELECT * FROM accounts WHERE email = ?', [email], cd);
    },
    login: (email, password, cd) => {
        conn.query('SELECT id, name, email FROM accounts WHERE email = ? AND password = ?', [email, password], cd);
    }
}
module.exports = Account;