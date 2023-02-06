const upload = require('../upload');
const conn = require('../connect');

module.exports = function(server) {
    server.get('/api/product', function(req, res) {
        let sql = "SELECT p.*, c.name as cat_name FROM products p JOIN categories c ON p.category_id = c.id Order By p.id DESC";
        conn.query(sql, function(err, data) {
            res.send({
                result: data,
                status: true
            })
        })
    });
    server.post('/api/upload', upload.single('image'), function(req, res) {
        req.body.image = req.file.filename;
        res.send({
            result: req.file.filename,
            status: true
        })
    });
}