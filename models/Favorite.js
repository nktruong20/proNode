const conn = require('../connect');
var Favorite = {
    getAll: (cd) => {
        conn.query('SELECT * FROM favourites ORDER BY id DESC', cd);
    },
    getAllByAccId: (accId, cd) => {
        conn.query('SELECT t.* FROM favourites f INNER JOIN tours t ON f.tour_id = t.id WHERE account_id = ? ORDER BY id DESC', [accId], cd);
    },
    getById: (id, cd) => {
        conn.query('SELECT * FROM favourites WHERE id = ?', [id], cd);
    },
    create: (data, cd) => {
        conn.query('INSERT INTO favourites SET ?', [data], cd);
    },
    update: (data, id, cd) => {
        conn.query('UPDATE favourites SET ? WHERE id = ?', [data, id], cd);
    },
    destroy: (tour_id, account_id, cd) => {
        conn.query('DELETE FROM favourites WHERE tour_id = ? AND account_id = ?', [tour_id, account_id], cd);
    },
    checkTourFavor: (tour_id, account_id, cd) => {
        conn.query('SELECT * FROM favourites WHERE tour_id = ? AND account_id = ?', [tour_id, account_id], cd);
    }
}
module.exports = Favorite;