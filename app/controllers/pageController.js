/**
 * /page
 */

var mongoose = require('mongoose');
var Page = mongoose.model('Page');

// /page?pageName
exports.getPage = function (req, res) {
    Page.findOne({name: req.query.pageName})
    .exec(function(err, page){
        if (!page){
            res.json(404, {msg: 'Page Not Found'});
        }else{
            res.json(page);
        }
    });
};