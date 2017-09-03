var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');

exports.getComment = function(req, res) {
  Comment.findOne({_id: req.params.commentId})
    .exec(function (err, comment) {
      if (!comment){
        res.json(404, {msg: 'Comment Not Found.'});
      }else{
        res.json(comment);
      }
    })
};

exports.postComment = function(req, res) {
  Comment.findOne({_id: req.body.commentIdRoot})
    .exec(function(err, comment) {
      if (!comment) {
        res.json(404, {msg: 'Comment Not Found.'});
      }else{
        var commentNew = new Reply(req.body.commentNew);
        commentNew.username = req.session.username;
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
  Comment.update({
    _id: comment.id
  }, {
    $set: {
      replies: comment.replies
    }
  })
    .exec(function (err, commentSaved) {
      if (err) {
        res.json(404, {msg: 'Failed to Update Comment.'});
      }else{
        res.json({msg: 'Success.'});
      }
    })
}

// TODO: getUsername from connected google account
function generateUsername(){
  var users = ['Alex', 'Bob', 'Claire', 'Dick', 'Emma', 'Frederic', 'George', 'Helen', 'Ian'];
  return users[Math.floor(Math.random() * users.length)];
}