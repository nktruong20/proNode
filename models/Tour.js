const conn = require('../connect');
var Tour = {
    getAll: (cd) => {
        conn.query('SELECT t.*,c.name as `cat_name` FROM tours t INNER JOIN categories c ON t.category_id = c.id  ORDER BY id DESC', cd);
    },
    search: (keyword, cb) => {
        conn.query(`SELECT t.*,c.name as 'cat_name' FROM tours t INNER JOIN categories c ON t.category_id = c.id WHERE t.name LIKE ? ORDER BY id DESC`, [keyword], cb);
    },
    getAllHaveAcc: (account_id = null, cd) => {
        conn.query('SELECT t.*, select1.favor FROM tours t LEFT JOIN (SELECT f.tour_id, a.id as `favor` FROM favourites f INNER JOIN accounts a ON f.account_id = ? AND f.account_id = a.id) select1 ON t.id = select1.tour_id ORDER BY id DESC', [account_id], cd);
    },
    getNew: (cd) => {
        conn.query('SELECT t.*,c.name as `cat_name` FROM tours t INNER JOIN categories c ON t.category_id = c.id  ORDER BY id DESC LIMIT 3', cd);
    },
    getSale: (cd) => {
        conn.query('SELECT t.*,c.name as `cat_name` FROM tours t INNER JOIN categories c ON t.category_id = c.id WHERE sale_price > 0  ORDER BY id DESC', cd);
    },
    getById: (id, cd) => {
        conn.query('SELECT t.*, c.name as `cat_name`  FROM tours t INNER JOIN categories c ON t.category_id = c.id WHERE t.id = ?', [id], cd);
    },
    getByCategoryIdHaveAcc: (account_id = null, id, cd) => {
        conn.query('SELECT t.*, select1.favor FROM tours t LEFT JOIN (SELECT f.tour_id, a.id as `favor` FROM favourites f INNER JOIN accounts a ON f.account_id = ? AND f.account_id = a.id) select1 ON t.id = select1.tour_id WHERE t.category_id = ? ORDER BY id DESC', [account_id, id], cd);
    },
    getByCategoryId: (id, cd) => {
        conn.query('SELECT t.*,c.name as `cat_name` FROM tours t INNER JOIN categories c ON t.category_id = c.id WHERE category_id = ?', [id], cd);
    },
    create: (data, cd) => {
        conn.query('INSERT INTO tours SET ?', [data], cd);
    },
    update: (data, id, cd) => {
        conn.query('UPDATE tours SET ? WHERE id = ?', [data, id], cd);
    },
    destroy: (id, cd) => {
        conn.query('DELETE FROM tours WHERE id = ?', [id], cd);
    }
}
module.exports = Tour;
