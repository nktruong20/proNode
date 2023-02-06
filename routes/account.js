const upload = require('../upload');
const conn = require('../connect');
const AccountController = require('../controllers/AccountController');
module.exports = function(server) {
    server.get('/api/account', AccountController.index);
    server.post('/api/account', AccountController.store);
    server.post('/api/account/login', AccountController.login);
    server.get('/api/account/:id', AccountController.edit);
    server.put('/api/account/:id', AccountController.update);
    server.delete('/api/account/:id', AccountController.delete);
}