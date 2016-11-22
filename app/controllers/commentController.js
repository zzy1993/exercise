/**
 * 
 */

var mongoose = require('mongoose');
var Comment = mongoose.module('Comment');

// /comment?commentId
exports.getComment = function(req, res) {
    // key by query
    Comment.findOne({_id: req.query.commentId})
        // error and response in callback
        .exec(function (err, comment) {
            if (!comment){
                res.json(404, {msg: 'Comment Not Found.'});
            }else{
                res.json(comment);
            }
        })
};