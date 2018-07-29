import React, { Component } from 'react';
import '../app.css';

export default class TweetForm extends Component {
  constructor(props) {
    super(props);
    this.tweetUrl = 'https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A3000%2F&ref_src=twsrc%5Etfw&tw_p=tweetbutton&hashtags=nowplaying';
    this.state = {
      comment: '',
      videoUrl: '',
      tweetUrl: this.tweetUrl
    };
    this.handleCommentChange = this._handleCommentChange.bind(this);
    this.handleVideoUrlChange = this._handleVideoUrlChange.bind(this);
    this.onTweet = props.onTweet;
  }

  render() {
    return (
      <div className="form">
        <form>
          <label> Video URL:
            <input type="text" name="videoUrl" value={this.state.videoUrl} onChange={this.handleVideoUrlChange} />
          </label>
          <label> Comment:
            <input type="text" name="comment" value={this.state.comment} onChange={this.handleCommentChange} />
          </label>

          <div id="htButton" className="hashtagButton">
            <div className="body xl ready">
              <div id="widget">
                <div className="btn-o">
                  <a href={this.state.tweetUrl} className="btn" id="b" onClick={this.onTweet}>
                    <i />
                    <span className="label" id="l">Tweet to #nowplaying</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  _handleCommentChange(event) {
    this.setState({ comment: event.target.value });
    const url = this.state.videoUrl !== '' ? `&url=${this.state.videoUrl}` : '';
    const text = event.target.value !== '' ? `&text=${event.target.value}` : '';
    this.setState({ tweetUrl: this.tweetUrl + url + text });
  }

  _handleVideoUrlChange(event) {
    this.setState({ videoUrl: event.target.value });
    const url = event.target.value !== '' ? `&url=${event.target.value}` : '';
    const text = this.state.comment !== '' ? `&text=${this.state.comment}` : '';
    this.setState({ tweetUrl: this.tweetUrl + url + text });
  }
}
