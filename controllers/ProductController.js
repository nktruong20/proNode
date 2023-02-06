const { options } = require('joi');
const Joi = require('joi');
var Product = require('../models/Product')

var ProductController = {
    index:(req, res) => {
            Product.getAll((err, data) => {
                res.send({
                    Products: data,
                    status: true
                })
            })
    },
    ProductByCategory: (req, res) => {
        if (req.query.favor) {
            Product.getByCategoryIdHaveAcc(req.query.favor, req.params.id, (err, data) => {
                res.send({
                    Products: data,
                    status: true
                })
            })

        } else {
            Product.getByCategoryId(req.params.id, (err, data) => {
                res.send({
                    Products: data,
                    status: true
                })
            })
        }
    },
    newProduct: (req, res) => {
        Product.getNew((err, data) => {
            res.send({
                Products: data,
                status: true
            })
        })
    },
    saleProduct: (req, res) => {
        Product.getSale((err, data) => {
            res.send({
                Products: data,
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

            Product.create(req.body, (err, data) => {
                res.send({
                    Products: req.body,
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
    edit: (req, res) => {
        Product.getById(req.params.id, (err, data) => {
            res.send({
                Products: data.length > 0 ? data : null,
                status: true
            })
        })
    },
    delete: (req, res) => {
        Product.destroy(req.params.id, (err, data) => {
            res.send({
                Products: null,
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
            image: Joi.string().required(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Product.update(req.body, req.params.id, (err, data) => {
                res.send({
                    Products: req.body,
                    status: true
                })
            })
        }
    }
}
module.exports = ProductController;
