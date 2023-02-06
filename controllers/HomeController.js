const Joi = require('joi');
var Category = require('../models/Category')
const Tour = require('../models/Tour');

var HomeController = {
    tours: (req, res) => {
        Tour.getAll((err, data) => {
            Category
            res.send({
                tours: data,
                status: true
            })
        })
    },
    toursByCategory: (req, res) => {
        Tour.getByCategory(req.params.category_id, (err, data) => {
            res.send({
                tours: data,
                status: true
            })
        })
    },
    detail: (req, res) => {
        Tour.getById(req.params.id, (err, data) => {
            res.send({
                tours: data.length > 0 ? data : null,
                status: true
            })
        })
    }
}

module.exports = HomeController;