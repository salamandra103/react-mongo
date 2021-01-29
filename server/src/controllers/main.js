const Main = require('../models/main');
const createError = require('http-errors');

exports.getData = (req, res, next) => {
    Main.find({}, (err, data) => {
        if (err) {
            next(createError(404));
        } else {
            res.send(data)
        }
    });
};

exports.setData = (req, res, next) => {
    let data = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age
    }
    
    Main.create(data, (err, data) => {
        console.log(data);
        if (err) {
            next(createError(404));
        } else {
            res.send(data)
        }
    });
}