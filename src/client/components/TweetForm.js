import React, { Component } from 'react';
import '../app.css';
import { TwitterHashtagButton } from 'react-twitter-embed';

export default class TweetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            options: {size: "large", buttonHashtag: {}}
        };
        this.handleChange = this._handleCommentChange.bind(this);
    }

    render() {
        console.log("Rendered!");
        return (
            <div className='form'>
                <form>
                    <label>
                        Video URL:
                        <input type="text" name="videoUrl" />
                    </label>
                    <label>
                        Comment:
                        <input type="text" name="comment" value={this.state.comment} onChange={this.handleChange} />
                    </label>
                    <div className='hashtagButton'>
                        <TwitterHashtagButton
                            tag={'nowplaying'}
                            options={this.state.options}
                        />
                    </div>
                </form>
            </div>
        );
    }

    _handleCommentChange(event) {
        this.setState({comment: event.target.value});
        this.setState({options: {size: "large", text: this.state.comment, buttonHashtag: {}}});
    }
}
