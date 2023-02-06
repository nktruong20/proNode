const conn = require('../connect');
var Category = {
    getAll: (cd) => {
        conn.query('SELECT * FROM categories ORDER BY id DESC', cd);
    },
    getById: (id, cd) => {
        conn.query('SELECT * FROM categories WHERE id = ?', [id], cd);
    },

    create: (data, cd) => {
        conn.query('INSERT INTO categories SET ?', [data], cd);
    },
    update: (data, id, cd) => {
        conn.query('UPDATE categories SET ? WHERE id = ?', [data, id], cd);
    },
    destroy: (id, cd) => {
        conn.query('DELETE FROM categories WHERE id = ?', [id], cd);
    }
}
module.exports = Category;