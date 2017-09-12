module.exports = {
	// db_url: 'mongodb://heroku_ltc3nrft:srsb7rf745o63p9uddu6a2197e@ds133104.mlab.com:33104/heroku_ltc3nrft'
	// db_url: 'mongodb://heroku_pgmh8nft:q1tbb7054k1o5718198qsfck7c@ds111798.mlab.com:11798/heroku_pgmh8nft'
	db_url:     process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/galler'
};