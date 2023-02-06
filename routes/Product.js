const upload = require('../upload');
const ProductController = require('../controllers/ProductController');
module.exports = function(server) {
    server.get('/api/product', ProductController.index);
    server.get('/api/new-product', ProductController.newProduct);
    server.get('/api/productByCategory/:id', ProductController.ProductByCategory);  
    server.get('/api/sale-product', ProductController.saleProduct);
    server.post('/api/product', ProductController.store);
    server.get('/api/product/:id', ProductController.edit);
    server.put('/api/product/:id', ProductController.update);
    server.delete('/api/product/:id', ProductController.delete);
}