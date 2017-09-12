module.exports = {
	// db_url: 'mongodb://heroku_9c74vnb6:ancummehj3dpgrca67rue9ge8f@ds135234.mlab.com:35234/heroku_9c74vnb6'
	db_url: process.env.MONGODB_URI || 'mongodb://localhost/galler'
};