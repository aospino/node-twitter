var twitter = require('twitter');
var config = require('./config');

//you need to go to apps.twitter.com and register your app to get the below values
var twit = new twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
});

twit.stream('statuses/filter', { track: config.hashTag }, function (stream) {
    stream.on('data', function (data) {
        console.log('Tweet received from ' + data.user.screen_name + ': "' + data.text + '"');
    });
    stream.on('error', function (error) {
        console.log('Stream error calling Twitter Streaming API: ' + error);
    });
});