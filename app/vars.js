module.exports = {
	db_url: process.env.MONGODB_URI || 'mongodb://localhost/galler',
	facebook_config: {
		clientID        : '136657663741142',
		clientSecret    : '16004d3d4df27444ff6dcdc64f9d0a61',
		callbackURL     : '/auth/facebook/callback'
	},
	google_config: {
		
	}
};