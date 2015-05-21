var twitter = require('twitter');
var config = require('./config');

//you need to go to apps.twitter.com and register your app to get the below values
var twit = new twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
});

//monitor by phrase (works great for hash tags!)
twit.stream('statuses/filter', { track: config.trackPhrase }, function (stream) {
    stream.on('data', function (data) {
        console.log('Tweet received from ' + data.user.screen_name + ': "' + data.text + '"');
        
        //do something cool here
        //this will fire every time a tweet happens with the track phrase
        
    });
    stream.on('error', function (error) {
        console.log('Stream error calling Twitter Streaming API: ' + error);
    });
});

//monitor by user (tweets, retweets, etc.)
twit.showUser(config.screenname, function (data) {
    userId = data.id;
    twit.stream('statuses/filter', { follow: userId }, function (stream) {
        stream.on('data', function (data) {
            console.log('Tweet received from ' + data.user.screen_name + ': "' + data.text + '"');
            
            //do something cool here
            //this will fire every time a tweet happens with this screenname mentioned
        
        });
        stream.on('error', function (error) {
            console.log('Stream error calling Twitter Streaming API: ' + error);
        });
    });
});
