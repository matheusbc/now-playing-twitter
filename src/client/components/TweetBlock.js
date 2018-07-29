import React, { Component } from 'react';
import '../app.css';
import YouTube from 'react-youtube';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default class TweetBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.videoId,
      videoName: null,
      tweetId: props.tweetId
    };
    this.onReady = this._onReady.bind(this);
  }

  componentDidMount() {
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ location: this.state.location }));
  }

  _onReady(event) {
    this.setState({
      videoName: event.target.getVideoData().title
    });
  }

  render() {
    const opts = {
      height: '300',
      width: '500',
      playerVars: {
        autoplay: 0
      }
    };

    return (
      <div className="tweet-block">
        {this.state.videoName ? (
          <h1>
            {this.state.videoName}
          </h1>
        ) : (
          <h1>
                        Loading... please wait!
          </h1>
        )}
        <YouTube
          videoId={this.state.videoId}
          opts={opts}
          onReady={this.onReady}
        />
        <div className="tweet-info" >
          <TwitterTweetEmbed tweetId={this.state.tweetId} options={{cards: "hidden", conversation: "none"}} />
        </div>
      </div>
    );
  }
}
