import React, { Component } from 'react';
import '../app.css';
import YouTube from 'react-youtube';
import { TwitterTweetEmbed } from 'react-twitter-embed';

// Component that shows the tweet information and its youtube video.
export default class TweetBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: '',
      videoName: null,
      tweetId: props.tweetId
    };
    this.videoUrl = props.videoId;
    this.onReady = this._onReady.bind(this);
  }

  componentDidMount() {
    // Retrieves the youtube video id from the video url.
    const url = `/api/unshortener/youtubetco?url=${this.videoUrl}`;
    fetch(url)
      .then(res => res.json())
      .then((videoResponse) => {
        this.setState({ videoId: videoResponse.videoId });
      });
  }

  render() {
    // Youtube video component options.
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
        {/* Shows an empty message if there are any tweets. */}
        <div className="tweet-info">
          <TwitterTweetEmbed tweetId={this.state.tweetId} options={{ cards: 'hidden', conversation: 'none' }} />
        </div>
      </div>
    );
  }

  // Callback called on youtube video component is ready.
  // Extracts the video name and updates the component state.
  _onReady(event) {
    this.setState({
      videoName: event.target.getVideoData().title
    });
  }
}
