const { options } = require('joi');
const Joi = require('joi');
var Tour = require('../models/Tour')

var TourController = {
    index: (req, res) => {
            Tour.getAll((err, data) => {
                res.send({
                    tours: data,
                    status: true
                })
            })

    },
    getTourByCategory: (req, res) => {
        if (req.query.favor) {
            Tour.getByCategoryIdHaveAcc(req.query.favor, req.params.id, (err, data) => {
                res.send({
                    tours: data,
                    status: true
                })
            })

        } else {
            Tour.getByCategoryId(req.params.id, (err, data) => {
                res.send({
                    tours: data,
                    status: true
                })
            })
        }
    },
    newTour: (req, res) => {
        Tour.getNew((err, data) => {
            res.send({
                tours: data,
                status: true
            })
        })
    },
    saleTour: (req, res) => {
        Tour.getSale((err, data) => {
            res.send({
                tours: data,
                status: true
            })
        })
    },
    store: (req, res) => {

        const schema = Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            sale_price: Joi.number().required(),
            category_id: Joi.number().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            status: Joi.number().required()
        })

        const { error } = schema.validate(req.body, options);

        if (!error) {

            Tour.create(req.body, (err, data) => {
                res.send({
                    tours: req.body,
                    status: true
                })
            })
        } else {
            let err = new Error(error.message);
            res.send({
                err: err,
                status: false
            })
        }

    },
    searchTour: (req, res) => {
        let keyword = '%' + req.params.search + '%';
        Tour.search(keyword, (err, data) => {
            if (err) {
                error = new Error(err.message)
                console.log(error)
            }
            res.send({
                tours: data,
                status: true
            })
        })
    },
    edit: (req, res) => {
        Tour.getById(req.params.id, (err, data) => {
            res.send({
                tours: data.length > 0 ? data : null,
                status: true
            })
        })
    },
    delete: (req, res) => {
        Tour.destroy(req.params.id, (err, data) => {
            res.send({
                tours: null,
                status: true
            })
        })
    },
    update: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            sale_price: Joi.number().required(),
            category_id: Joi.number().required(),
            description: Joi.string().required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Tour.update(req.body, req.params.id, (err, data) => {
                res.send({
                    tours: req.body,
                    status: true
                })
            })
        }
    }
}

module.exports = TourController;