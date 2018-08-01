import React, { Component } from 'react';
import './app.css';
import Geocoder from 'react-native-geocoding';
import Header from './components/Header';
import TweetForm from './components/TweetForm';
import TweetBlock from './components/TweetBlock';

// Initialize the google geocoding library. Should pass a valid google API-Key as parameter.
Geocoder.init('AIzaSyC4ZXOxSwv620lvYJH78-waFubFy2ubaB0');

// The main component that shows the main page.
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      city: null,
      tweets: []
    };
    this.onTweet = this._onTweet.bind(this);
  }

  componentDidMount() {
    this._loadLocation();
  }

  render() {
    return (
      <div>
        {this.state.city ? (
          <div>
            <Header city={this.state.city} />
            <TweetForm onTweet={this.onTweet} />

              {this.state.tweets.length === 0 ? (
                  <h1>
                      Nobody is #nowplaying youtube videos on your location.
                  </h1>
              ) : (
                  this.state.tweets.map((tweet, index) => {
                      const matches = tweet.text.match(/\bhttps?:\/\/\S+/gi);
                      return (
                          <TweetBlock
                              key={tweet.id_str}
                              videoId={matches[0]}
                              tweetId={tweet.id_str}
                          />
                      );
                  })
              )}
          </div>
        ) : (
          <h1>
            Loading... please wait!
          </h1>
        )}
      </div>
    );
  }

  // Loads the user location and the location city name.
  _loadLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: `${position.coords.latitude},${position.coords.longitude},100km`
      });

      Geocoder.from(position.coords.latitude, position.coords.longitude)
        .then((json) => {
          for (const addressComponent of json.results[0].address_components) {
            if (addressComponent.types[0] === 'administrative_area_level_2') {
              this.setState({
                city: `${addressComponent.long_name}`
              });
            }
          }
          if (this.state.city === null) {
              this.setState({
                  city: `${json.results[0].address_components[0].long_name}`
              });
          }
        })
        .catch(error => console.warn(error));

      this._searchTweets();
    }, (error) => {
      console.warn(error);
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  // Searches the last five #nowplaying tweets from near people, accordingly to the user location.
  _searchTweets() {
    fetch(`/api/search/tweets?location=${this.state.location}`)
      .then(res => res.json())
      .then((tweets) => {
        this.setState({ tweets: tweets.tweets.statuses });
      });
  }

  // Called on a new #nowplaying message is tweeted.
  _onTweet = (e) => {
    e.preventDefault();
    setTimeout(function(){
      this.setState({ tweets: [] });
      this._searchTweets();
    }.bind(this), 30000); // Wait 30 seconds as tweet propagate.
  };
}
