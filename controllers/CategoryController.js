const { options } = require('joi');
const Joi = require('joi');
var Category = require('../models/Category')

var CategoryController = {
    index: (req, res) => {
        Category.getAll((err, data) => {
            res.send({
                categories: data,
                status: true
            })
        })
    },
    store: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Category.create(req.body, (err, data) => {
                res.send({
                    categories: req.body,
                    status: true
                })
            })
        }

    },
    edit: (req, res) => {
        Category.getById(req.params.id, (err, data) => {
            res.send({
                categories: data.length > 0 ? data : null,
                status: true
            })
        })
    },
    delete: (req, res) => {
        Category.destroy(req.params.id, (err, data) => {
            res.send({
                categories: null,
                status: true
            })
        })
    },
    update: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Category.update(req.body, req.params.id, (err, data) => {
                res.send({
                    categories: req.body,
                    status: true
                })
            })
        }
    }
}
module.exports = CategoryController;