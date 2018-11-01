const Twit = require('twit')
var randomWords = require('random-words');

const config = require('./config')
console.log(config.access_token)
const T = new Twit(config);


//Tweet After Every 20 Second
function tweetIt() {
    const tweet = {
        status: '#MolanaRizvi' + ' ' + randomWords() + ' ' + randomWords() + ' ' + randomWords()
    }

    T.post('statuses/update', tweet, postTweet)

    function postTweet(err, data, response) {
        if (err) {
            console.log('Something goes wrong')
        }
        else {
            console.log('Its Work Really Good')
        }
    }
}

setInterval(tweetIt, 20000)

//Search Tweets in Tweeter
 var params = {
    q: 'BiyaAli9',  //for search word
    count: 1
}

T.get('search/tweets', params, gotData);
function gotData(err, data, response) {
    for (var i = 0; i < data.statuses.length; i++) {
        console.log(data.statuses[i].id_str)
    }
}
 
 //Retweet this tweet id
 T.post('statuses/retweet/:id', { id: '1057937528991506432' }, Retweet)
function Retweet(err, data, response) {
    console.log(data)
} 



//Filter the Tweets according to locations

var latlng = [ '-122.75', '36.8', '-121.75', '37.8' ]
var stream = T.stream('statuses/filter', { locations: latlng })
stream.on('tweet', function (tweet) {
  console.log(tweet)
})
