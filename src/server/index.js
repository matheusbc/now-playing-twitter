const express = require('express');
const Twitter = require('twitter');

const app = express();

const client = new Twitter({
  consumer_key: 'CXVNsTDohsJaIxl0cjpuLKXYr',
  consumer_secret: 'Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB\n',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAH3eawAAAAAA0zC%2BvWRRiTPyQUiMU2Zl59yOdfk%3DECQQdP5dVANyvH62RNhHioT4culhhqLhCTE5TsAMhqbd39HI1Z'
});

app.use(express.static('dist'));
app.get('/api/search/tweets', (req, res) => {
    console.log(req.query.location);
  client.get('search/tweets', { q: '#nowplaying AND youtube.com,exclude:retweets', geocode: req.query.location+'', count: 5, result_type: 'recent', include_entities: 'false' },
    (error, tweets, response) => {
      console.log(error);
      console.log(tweets);
      res.send({ tweets });
    });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
