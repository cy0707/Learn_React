import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  // 验证
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  };

  constructor () {
    super();
    this.state = {
      timeStirng: ''
    };
  }

  // 组件挂载之前
  componentWillMount () {
    this._updateTimeString();
    this._timer = setInterval(this._updateTimeString.bind(this), 5000);
  }

  // 更新时间
  _updateTimeString () {
    const comment = this.props.comment;
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeStirng: duration > 60 
                  ? `${Math.round(duration / 60)}分钟之前`
                  : `${Math.round(Math.max(duration, 1))}秒前`
    });
  }

  // 删除评论
  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  // 组件卸载之前
  componentWillUnmount () {
    clearInterval(this._timer);
  }

  // 把输入的内容转为html
  _getProcessedContent (content) {
   return content
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#039;")
     .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
 }

  render() {
    const comment = this.props.comment;
    return (
      <div className='comment'>
       <div className='comment-user'>
         <span>{comment.username} </span>：
       </div>
       <p dangerouslySetInnerHTML={{
         __html: this._getProcessedContent(comment.content)
       }} />
       <span className='comment-createdtime'>
         {this.state.timeString}
       </span>
       <span className='comment-delete'
              onClick={this.handleDeleteComment.bind(this)}
        >
         删除
       </span>
      </div>
    );
  }
}

export default Comment;
