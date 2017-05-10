import React, { Component } from 'react';
import PropTypes from 'prop-types';


class CommentInput extends Component {
  static proptypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUsernameInputBlur: PropTypes.func
  };

  static defaultProps = {
    username: ''
  };

  constructor (props) {
    super(props);
    this.state = {
      username: props.username,
      content: ''
    };
  }

  // 修改名字
  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    });
  }

  // 修改评论内容
  handleContnetChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  // 用户名改变
  handleUsernameBlur (event) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(event.target.value);
    }
  }

  // 点击评论
  handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      })
    }
    this.setState({ content: ''});
  }

  // 组件挂载完成后
  componentDidMount () {
    this,.textarea.focus();
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
              ref={(textarea) => this.textarea=textarea}
              value={this.state.content}
              onChange={this.handleContnetChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
