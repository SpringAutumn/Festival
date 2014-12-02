var FestivalModel = require('../models/festival').FestivalModel;

var list_festivals = function (req, res) {
    FestivalModel
        .find()
        .select('name date activities')
        .exec(function (err, results) {
            if (err) {
                res.status(500).json({message: 'List festivals failure.'});
                return;
            }
            res.status(200).json(results);
        });
};

var query_festival_detail = function (req, res) {
    FestivalModel
        .findById(req.params.id)
        .select('name date activities')
        .exec(function (err, results) {
            if (err) {
                res.status(500).json({message: 'List festivals failure.'});
                return;
            }
            res.status(200).json(results);
        });
};

var create_festival = function (req, res) {
    var festival = new FestivalModel(req.body);
    festival.save(function (err, result) {
        if (err) {
            res.status(500).json({message: 'Create festival failure.'});
            return;
        }
        res.status(200).json(result);
    });
};

var update_festival = function (req, res) {
    FestivalModel
        .findByIdAndUpdate(req.params.id, req.body)
        .exec(function (err, result) {
            if (err) {
                res.status(500).json({message: 'Update festival failure.'});
                return;
            }
            res.status(200).json(result);
        })
};

var delete_festival = function (req, res) {
    FestivalModel
        .findByIdAndRemove(req.params.id)
        .exec(function (err, result) {
            if (err) {
                res.status(500).json({message: 'Update festival failure.'});
                return;
            }
            res.status(204).end();
        })
};

module.exports.list_festivals = list_festivals;
module.exports.query_festival_detail = query_festival_detail;
module.exports.create_festival = create_festival;
module.exports.update_festival = update_festival;
module.exports.delete_festival = delete_festival;

