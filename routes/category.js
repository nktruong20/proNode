const upload = require('../upload');
const conn = require('../connect');
const CategoryController = require('../controllers/CategoryController');
module.exports = function(server) {
    server.get('/api/category', CategoryController.index);
    server.post('/api/category', CategoryController.store);
    server.get('/api/category/:id', CategoryController.edit);
    server.put('/api/category/:id', CategoryController.update);
    server.delete('/api/category/:id', CategoryController.delete);
}