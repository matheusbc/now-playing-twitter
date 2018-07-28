import React, { Component } from 'react';
import '../app.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { city: props.city };
  }

  render() {
    return (
      <div>
        <h1>
          #nowplaying in {this.state.city}
        </h1>
        <h3>
          This page shows #nowplaying tweets in {this.state.city} that contain a youtube link.
          It also allows you to post a #nowplaying tweet with a YouTube link.
        </h3>
      </div>
    );
  }
}
