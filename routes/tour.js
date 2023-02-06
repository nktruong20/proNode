const upload = require('../upload');
const TourController = require('../controllers/TourController');
module.exports = function(server) {
    server.get('/api/tour', TourController.index);
    server.get('/api/tourByCategory/:id', TourController.getTourByCategory);
    server.get('/api/new-tour', TourController.newTour);
    server.get('/api/sale-tour', TourController.saleTour);
    server.get('/api/tour/:search', TourController.searchTour);
    server.post('/api/tour', TourController.store);
    server.get('/api/tour/:id', TourController.edit);
    server.put('/api/tour/:id', TourController.update);
    server.delete('/api/tour/:id', TourController.delete);
}