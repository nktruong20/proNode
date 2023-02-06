const upload = require('../upload');
const conn = require('../connect');
const FavoriteController = require('../controllers/FavoriteController');
module.exports = function(server) {
    server.get('/api/favorite', FavoriteController.index);
    // server.get('/api/favorite/check', FavoriteController.checkFavor);
    server.post('/api/favorite', FavoriteController.store);
    server.get('/api/favorite/:id', FavoriteController.edit);
    server.put('/api/favorite/:id', FavoriteController.update);
    server.delete('/api/favorite/delete', FavoriteController.delete);

}