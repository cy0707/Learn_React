import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } form 'react-redux';
import CommentList fomr '../components/CommentList';
import { initComments, deleteComment} from '../reducers/comments';

// 对于 CommentList 组件，可以看到它接受两个参数：comments 
// 和 onDeleteComment。说明需要一个 Smart 组件来负责把 comments 
// 数据传给它，并且还得响应它删除评论的请求。

class CommentListContainer extends Component {
  // 默认属性
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  };

  // 删除评论
  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  // 组件挂载之前
  componentWillMount () {
    this._loadComments();
  }

  _loadComments () {
    // 从localstorage加载数据
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    // this.props.initComments 是 connect 传进来的
    // 可以帮我们把数据初始化到 state 里面去
    this.props.initComments(comments);
  }

  render() {
    return (
      <CommentList
      comments={this.props.comments}
      onDeleteComment={this.handleDeleteComment.bind(this)} />
    );
  }
}


// 评论列表从 state.comments 中获取
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给 CommentListContainer
    // 当从 LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    // 删除评论
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)

