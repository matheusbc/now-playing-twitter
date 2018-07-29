import React, { Component } from 'react';
import './app.css';
import Geocoder from 'react-native-geocoding';
import Header from './components/Header';
import TweetForm from './components/TweetForm';
import TweetBlock from './components/TweetBlock';

Geocoder.init('AIzaSyCQM7O58Zdv9qGWWYF4cppIu2kofpV3olw'); // use a valid API key

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      city: null,
      videoId: '2g811Eo7K8U',
      tweetId: '933354946111705097',
      tweets: []
    };
  }

  componentDidMount() {
    this._setLocation();
  }

  render() {
    return (
      <div>
        {this.state.city ? (
          <div>
            <Header city={this.state.city} />
            <TweetForm />
              {this.state.tweets.map(function(tweet, index) {
                console.log(tweet);
                  return <TweetBlock
                      key={tweet.id_str}
                      videoId='2g811Eo7K8U'
                      tweetId={tweet.id_str}
                  />
              })}
          </div>
        ) : (
          <h1>
            Loading... please wait!
          </h1>
        )}
      </div>
    );
  }

  _setLocation() {
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
        })
        .catch(error => console.warn(error));

      this._searchTweets();
    }, (error) => {
      console.log(error);
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }

  _searchTweets() {
    fetch(`/api/search/tweets?location=${this.state.location}`)
      .then(res => res.json())
      .then(tweets => this.setState({ tweets: tweets.tweets.statuses }));
  }
}
