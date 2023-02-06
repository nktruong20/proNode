const { options } = require('joi');
const Joi = require('joi');
var Favorite = require('../models/Favorite')

var FavoriteController = {
    index: (req, res) => {
        if (req.query.account_id) {
            Favorite.getAllByAccId(req.query.account_id, (err, data) => {
                res.send({
                    favorites: data,
                    status: true
                })
            })
        } else {
            Favorite.getAll((err, data) => {
                res.send({
                    favorites: data,
                    status: true
                })
            })
        }

    },
    // checkFavor: (req, res) => {
    //     Favorite.checkTourFavor(req.query.tour_id, req.query.account_id, (err, data) => {
    //         res.send({
    //             favorites: data.length > 0 ? data : null,
    //             status: true
    //         })
    //     })
    // },
    store: (req, res) => {
        Favorite.create(req.body, (err, data) => {
            res.send({
                favorites: req.body,
                status: true
            })
        })
    },
    edit: (req, res) => {
        Favorite.getById(req.params.id, (err, data) => {
            res.send({
                favorites: data.length > 0 ? data : null,
                status: true
            })
        })
    },
    delete: (req, res) => {
        Favorite.destroy(req.query.tour_id, req.query.account_id, (err, data) => {
            res.send({
                favorites: null,
                status: true
            })
        })
    },

    update: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.string().required().unique(),
            status: Joi.number().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Favorite.update(req.body, req.params.id, (err, data) => {
                res.send({
                    favorites: req.body,
                    status: true
                })
            })
        }
    }
}

module.exports = FavoriteController;