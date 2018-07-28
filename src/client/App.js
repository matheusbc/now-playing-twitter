import React, { Component } from 'react';
import './app.css';
import Geocoder from 'react-native-geocoding';
import Header from './components/Header';

Geocoder.init('AIzaSyCQM7O58Zdv9qGWWYF4cppIu2kofpV3olw'); // use a valid API key

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      city: null
    };
  }

  componentDidMount() {
    this._setLocation();
  }

  render() {
    return (
      <div>
        {this.state.city ? (
          <Header city={this.state.city} />
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
        location: `${position.coords.latitude},${position.coords.longitude}`
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
    }, (error) => {
      console.log(error);
    }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
  }
}
