"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var invoices = [{ _id: 121222, item: "amzon product", qty: 10, date: new Date() }, { _id: 221222, item: "google product", qty: 10, date: new Date() }, { _id: 321222, item: "linkedin product", qty: 10, date: new Date() }];
exports.default = {
    findAll: function findAll(req, res, next) {
        res.json(invoices);
    },
    create: function create(req, res) {
        var _req$body = req.body,
            item = _req$body.item,
            qty = _req$body.qty,
            date = _req$body.date,
            due = _req$body.due,
            tax = _req$body.tax,
            rate = _req$body.rate;

        if (!item) {
            return res.status(400).json({ err: 'item is required field!' });
        }
        if (!qty) {
            return res.status(400).json({ err: 'qty is required field!' });
        }
        if (!data) {
            return res.status(400).json({ err: 'date is required field!' });
        }
        if (!due) {
            return res.status(400).json({ err: 'due is required field!' });
        }

        invoice.create({ item: item, qty: qty, date: date, due: due, tax: tax, rate: rate }).then(function (invoice) {
            return res.json(invoice);
        }).catch(function (err) {
            return res.status(500).json(err);
        });
    }
};
//# sourceMappingURL=invoice.controller.js.map