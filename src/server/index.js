const express = require('express');
const Twitter = require('twitter');
const request = require('request');

const app = express();

const client = new Twitter({
  consumer_key: 'CXVNsTDohsJaIxl0cjpuLKXYr',
  consumer_secret: 'Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB\n',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAH3eawAAAAAA0zC%2BvWRRiTPyQUiMU2Zl59yOdfk%3DECQQdP5dVANyvH62RNhHioT4culhhqLhCTE5TsAMhqbd39HI1Z'
});

app.use(express.static('dist'));
app.get('/api/search/tweets', (req, res) => {
  client.get('search/tweets', {
    q: '#nowplaying AND youtube.com,exclude:retweets',
    geocode: `${req.query.location}`,
    count: 5,
    result_type: 'recent',
    include_entities: 'false'
  },
  (error, tweets, response) => {
    res.send({ tweets });
  });
});
app.get('/api/unshortener/youtubetco', (req, res) => {
  request({ url: req.query.url, followRedirect: false }, (error, response, body) => {
    if (response.statusCode >= 300 && response.statusCode < 400) {
      const url = `${response.headers.location}`;
      const videoId = youtubeId(url);
      res.send({ videoId });
    }
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));

function youtubeId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}
