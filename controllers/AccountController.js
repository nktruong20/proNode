const { options } = require('joi');
const Joi = require('joi');
var Account = require('../models/Account');

var AccountController = {
    index: (req, res) => {
        Account.getAll((err, data) => {
            res.send({
                accounts: data,
                status: true
            })
        })
    },
    login: (req, res) => {
        Account.login(req.body.email, req.body.password, (err, data) => {
            if (err) {
                res.send({
                    accounts: req.body,
                    status: false,
                    message: 'Có lỗi từ phía máy chủ'
                })

            } else if (data.length == 0) {
                res.send({
                    accounts: req.body,
                    status: false,
                    message: 'Email hoặc mật khẩu không đúng'
                })

            } else {
                let user = data[0];
                res.send({
                    accounts: user,
                    status: true,
                    message: ''
                })
            }
        })
    },
    store: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Account.checkEmail(req.body.email, (err, data) => {
                if (data.length > 0) {
                    res.send({
                        status: false,
                        err: 'lỗi'
                    })
                } else {
                    Account.create(req.body, (err, data) => {
                        res.send({
                            accounts: req.body,
                            status: true
                        })
                    })
                }
            })

        }
    },
    edit: (req, res) => {
        Account.getById(req.params.id, (err, data) => {
            res.send({
                accounts: data.length > 0 ? data : null,
                status: true
            })
        })
    },
    delete: (req, res) => {
        Account.destroy(req.params.id, (err, data) => {
            res.send({
                accounts: null,
                status: true
            })
        })
    },
    update: (req, res) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const { error } = schema.validate(req.body, options);
        if (!error) {
            Account.update(req.body, req.params.id, (err, data) => {
                res.send({
                    accounts: req.body,
                    status: true
                })
            })
        }
    }
}
module.exports = AccountController;