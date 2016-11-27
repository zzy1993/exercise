/**
 * 
 */

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

// /comment?commentId
exports.getComment = function(req, res) {
    // key from GET query
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

// comment
exports.addComment = function(req, res) {
    // key form POST bodyfec
    Comment.findOne({_id: req.body.commentIdRoot})
        .exec(function(err, comment) {
            // a comment not exists
            if (!comment) {
                res.json(404, {msg: 'Comment Not Found.'});
            // a comment exists
            }else{
                var commentNew = new Reply(req.body.commentNew);
                commentNew.username = generateUsername();
                addComment(req, res, comment, comment, req.body.commentIdParent, commentNew);
            }
        })
};

function addComment(req, res, comment, commentCurrent, commentIdParent, commentNew) {
    if (comment.id == commentIdParent) {
        comment.replies.push(commentNew);
        updateComment(req, res, comment);
    }else{
        for (var i = 0; i < commentCurrent.replies.length; i++) {
            var c = commentCurrent.replies[i];
            if (c._id == commentIdParent) {
                c.replies.push(commentNew);
                var reply = comment.replies.toObject();
                updateComment(req, res, comment);
                break;
            }else{
                addComment(req, res, comment, c, commentIdParent, commentNew);
            }
        }
    }
}

function updateComment(req, res, comment) {
    Comment.update({_id: comment.id}, {$set: {replies: comment.replies}})
        .exec(function (err, commentSaved) {
            if (err) {
                res.json(404, {msg: 'Failed to Update Comment.'});
            }else{
                res.json({msg: 'Success.'});
            }
        })
}

function generateUsername(){
    var users = ['Alex', 'Bob', 'Claire', 'Dick'];
    return users[Math.floor(Math.random() * users.length)];
}