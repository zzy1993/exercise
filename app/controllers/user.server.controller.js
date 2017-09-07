var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

exports.postUser = function(req, res){
  User.findOne({username: req.body.username})
    .exec(function (error, user) {
      if(!user){
        user = new User({
          username: req.body.username,
          password: hashPassword(req.body.password),
          email: req.body.email
        });
        user.save(function (error) {
          if(error){
            
          }else{
            
          }
        });

      }else if(user.password == hashPassword()){

      }
    })
};

exports.postSession = function (req, res) {
  User.findOne({username: req.body.username})
    .exec(function (err, user) {
      if(!user){
        res.json(404, {msg: 'User not found.'});
      }else if (user.password == hashPassword(req.body.password)){
        req.session.regenerate(function () {
          req.session.userId = user._id;
          req.session.username = user.username;
          res.json({msg: 'Successful login.'});
        });
      }else{
        res.json({
        msg: 'Fail to login.'
        });
      }
    });
};

exports.deleteSession = function(req, res) {
  req.session.destroy(function () {
    res.json({msg: 'Successful logout.'});
  });
};

exports.getUser = function (req, res) {
  User.findOne({_id: req.params.userId})
    .exec(function (err, user) {
      if(!user){
        res.json(404, {msg: 'User not found.'});
      }else if (req.session.userId == req.params.userId){
        res.json(user);
      }else{
        res.json({msg: 'Fail to get config information.'});
      }
    });
};

// exports.postUser = function (req, res) {
//   User.findOne({username: req.body.username})
//     .exec(function (err, user){
//       if(!user){
//         var userNew = new User({
//           username: req.body.username,
//           email: req.body.email
//         });
//         userNew.set('passwordHashed', hashPassword(req.body.password));
//
//         userNew.save(function (err) {
//           if (err){
//             console.log('error');
//             res.json(404, {msg: 'Fail to create account.'});
//           }else{
//             console.log('correct');
//             req.session.regenerate(function () {
//               req.session.userId = userNew._id;
//               req.session.username = userNew.username;
//               res.json({msg: userNew.username + ' is created successfully.'});
//             });
//           }
//         });
//       }else{
//         res.json({msg: 'Fail to get config information.'});
//       }
//     });
// };

function hashPassword(password){
  return crypto.createHash('sha256')
    .update(password.toString())
    .digest('base64')
    .toString();
}