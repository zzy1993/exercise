var app = require('./app/app')();

var port = process.env.PORT || 3000;
app.listen(port);