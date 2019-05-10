import React, { Component } from "react"
import { createOneComment } from "./../api/apiHandler"


class Comments extends Component {
  constructor(props) {
    super(props)
    this.commentInput = React.createRef();
    this.focusCommentInput = this.focusCommentInput.bind(this);
    console.log(props)
    this.state = {
      content: "",
      idea: props.match.params.id,
      creator: props.loggedUser ? props.loggedUser._id : ""
    }

  }
  focusCommentInput() {
    const placeHolder = document.getElementsByClassName("comments-placeholder-wrapper")
    console.log(placeHolder)
    for (let i = 0; i < placeHolder.length; i++) {
      placeHolder[i].style.display = "none"
    }
    this.commentInput.current.focus();
  }

 // handleKey = (evt) => {
  //   // console.log(evt)
  //   // const inputComment = document.getElementById("input_comment");
  //   // console.log(inputComment.textContent.length)
  //   this.setState({ content: this.commentInput.current.textContent }
  //   )
  //   console.log("state:", this.state)
  //   if (evt.key === "Enter" && this.state.content.length > 0) {
  //     console.log("send to db")
  //     evt.preventDefault();
  //     createOneComment(this.state.content)
  //       .then(res => {
  //         console.log(this.commentInput.current)
  //         // this.commentInput.current.setAttribute("contenteditable", false);
  //         // this.commentInput.blur()
  //       })
  //       .catch(err => console.log(err))
  //       return false;
  //   } else {
  //     console.log("write a comment")
  //   }
  // }

  handleKey = (evt) => {
    this.setState({ content: this.commentInput.current.textContent })
  }

  handleClick = (evt) => {
    evt.preventDefault();
    console.log(this.state)
    if (this.state.content.length > 0) {
      createOneComment(this.state)
        .then(res => {
          console.log(res, this.commentInput.current)
          this.setState({content: ""})
          console.log(this.state.content)
          this.commentInput.current.textContent = ""
          // this.commentInput.current.setAttribute("contenteditable", false);
          this.commentInput.current.blur()
        })
        .catch(err => console.log(err))
    }
  }


  render() {
    return (
      <React.Fragment>
        <h3>Comments</h3>
        <form id="form_add_comments" className="form" onClick={this.focusCommentInput}>
          <div className="comments-placeholder-wrapper">
            <div className="comments-placeholder">Your comment...</div>
          </div>
          <div className="input-comment-wrapper">
            <div contentEditable="true" className="input-comment" id="input_comment" ref={this.commentInput} onKeyDown={this.handleKey}></div>
          </div>
          <button onClick={this.handleClick}>Post</button>
        </form>
      </React.Fragment >
    )
  }
}

export default Comments 