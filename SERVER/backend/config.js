var config = {};

config.twitter = {};
config.redis = {};
config.web = {};
config.app = {};
config.DB = {};

// config.default_stuff = ['red', 'green', 'blue', 'apple', 'yellow', 'orange', 'politics'];
// config.twitter.user_name = process.env.TWITTER_USER || 'username';
// config.twitter.password = process.env.TWITTER_PASSWORD || 'password';
// config.redis.uri = process.env.DUOSTACK_DB_REDIS;
// config.redis.host = 'hostname';
// config.redis.port = 6379;
// config.web.port = process.env.WEB_PORT || 9980;
// config.app.securedpath = '/api';	//this will be the secured api path from root
// config.app.jwtsecret = '936ee7cf-b0f6-4140-909b-926694c2ac80';



config.app.views = '../build/index.html';
config.app.DB = 'mongodb://localhost:27017/iBaset'

module.exports = config;
