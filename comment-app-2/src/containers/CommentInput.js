import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import { addComment } from '../reducers/comments';


class CommentInputContainer extends Component {
  // 验证传进来的属性
  static proptypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  };

  // 初始化username
  constructor () {
    super();
    this.state = {
      username: ''
    };
  }

  // 组件挂载之前，从本地存储加载数据
  componentWillMount () {
    this._loadUsername();
  }

  // 本地加载username
  _loadUsername () {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({username});
    }
  }

  // 存储username
  _saveUsername (username) {
    localStorage.setItem('username', username);
  }

  // 通过props把评论传递下去
  handleSubmitComment (comment) {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    // 从provide传过来的
    const { comments } = this.props;
    // 在一个新的进行修改，数据共享
    const newComments = [...comments, comment];
    localStorage.setItem('comments', JSON.stringify(newComments));
    // 派发一个事件---修改context中的数据
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  }

  render() {
    return (
      <CommentInput 
        username={this.state.username}
        onUsernameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    );
  }
}

// 包裹的属性---的高阶组价
// 这个smart组件需要store的comments,提及按钮的事件，存储评论
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer);
