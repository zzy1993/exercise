/**
 *
 */

var mongoose = require('mongoose');
var page = mongoose.model('Page');
exports.getPage = function (req, res) {
    page.findOne({name: req.query.pageName})
    .exec(function(err, page){
        if (!page){
            res.json(404, {msg: 'Page Not Found'});
        }else{
            res.json(page);
        }
    });
};