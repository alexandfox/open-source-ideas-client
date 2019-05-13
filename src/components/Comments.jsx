import React, { Component } from "react"
import { createOneComment } from "./../api/apiHandler"
import { getAllComments } from "./../api/apiHandler"
const placeHolder = document.getElementsByClassName("comments-placeholder-wrapper")

class Comments extends Component {
  constructor(props) {
    super(props)
    this.commentInput = React.createRef();
    this.focusCommentInput = this.focusCommentInput.bind(this);
    console.log(props)
    this.state = {
      content: "",
      idea: props.match.params.id,
      creator: props.loggedUser ? props.loggedUser._id : "",
      comments: []
    }
  }

  focusCommentInput() {
    console.log(placeHolder)
    for (let i = 0; i < placeHolder.length; i++) {
      placeHolder[i].classList.add("display-none")
    }
    this.commentInput.current.focus();

  }


  handleKey = (evt) => {
    this.setState({ content: this.commentInput.current.textContent })
  }

  componentDidMount() {
    // console.log(this.state.idea)
    getAllComments(this.state.idea)
      .then(res => {
        this.setState({ comments: res.data.dbSuccess })
        // console.log("state comment: ", this.state.comment)
      })
      .catch(err => console.log(err))
  }

  handleClick = (evt) => {
    evt.preventDefault();
    console.log(this.state)
    if (this.state.content.length > 0) {
      createOneComment(this.state)
        .then(res => {
          this.setState({ content: "" })
          this.commentInput.current.textContent = ""
          // this.commentInput.current.setAttribute("contenteditable", false);
          this.commentInput.current.blur()
          for (let i = 0; i < placeHolder.length; i++) {
            placeHolder[i].classList.remove("display-none")
          }
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    // const { comments } = this.state
    console.log("state lol", this.state.comments)
    return (
      <React.Fragment>
        {/* { console.log("main", main)} */}
        <h3>Comments</h3>
        <div>
          <ul>
            {this.state.comments.map((com, index) => (
              <li key={index} className="comments">{com.content}</li> ))
            }
          </ul>
        </div>
        <form id="form_add_comments" className="form" onClick={this.focusCommentInput}>
          <div className="comments-placeholder-wrapper">
            <div className="comments-placeholder">Your comment...</div>
          </div>
          <div className="input-comment-wrapper">
            <div contentEditable="true" className="input-comment" id="input_comment" ref={this.commentInput} onKeyUp={this.handleKey}></div>
          </div>
          <button onClick={this.handleClick}>Post</button>
        </form>
      </React.Fragment >
    )
  }
}

export default Comments 