import React, { Component } from "react"
import { createOneComment } from "./../api/apiHandler"
import Moment from 'react-moment';
import { updateOneIdea } from "./../api/apiHandler"
import { getOneIdea } from "./../api/apiHandler"
const placeHolder = document.getElementsByClassName("comments-placeholder-wrapper")

class Comments extends Component {
  constructor(props) {
    super(props)
    this.commentInput = React.createRef();
    this.focusCommentInput = this.focusCommentInput.bind(this);
    // console.log(props)
    this.state = {
      content: "",
      idea: props.match.params.id,
      creator: props.loggedUser ? props.loggedUser._id : "",
      comments: [],
      commentsDisplay: []
    }
  }

  focusCommentInput() {
    // console.log(placeHolder)
    for (let i = 0; i < placeHolder.length; i++) {
      placeHolder[i].classList.add("display-none")
    }
    this.commentInput.current.focus();

  }


  handleKey = (evt) => {
    this.setState({ content: this.commentInput.current.textContent })
  }

  pushIdArray = (arr) => {
    var arrOfId = [];
    for (let i = 0; i < arr.length; i++) {
      arrOfId.push(arr[i]._id)
    }
    return arrOfId
  }

  componentDidMount() {
    getOneIdea(this.state.idea)
      .then(res => {
        this.setState({ commentsDisplay: res.data.idea.comments, comments: this.pushIdArray(res.data.idea.comments) })
      })
      .catch(err => console.log(err))
  }

  handleClick = (evt) => {
    evt.preventDefault();
    // console.log(this.state)

    if (this.state.content.length > 0) {
      createOneComment(this.state)
        .then(res => {

          console.log(res.data)
          const comments = [...this.state.comments, res.data.dbSuccess._id]
          updateOneIdea(this.state.idea, { comments: comments })
            .then(res => {
              console.log("yooo", res.data)
              this.setState({ content: "", commentsDisplay: res.data.idea.comments }, () => {
                this.commentInput.current.textContent = ""
              })

              })
                .catch(err => console.log(err))
              // })
              // this.commentInput.current.textContent = ""
              // this.commentInput.current.blur()
              // for (let i = 0; i < placeHolder.length; i++) {
              //   placeHolder[i].classList.remove("display-none")
              // }

            })
            .catch(err => console.log(err))
        }
  }

    render() {


      // if(!this.state.commentsDisplay.length) return <p>Nothing to display</p>
      return (
        <section className="comments">
          <h3 className="ideaSecHeading" >Comments</h3>
          <div>
            {this.state.commentsDisplay.map((com, index) => (
              <div key={index}>
                <div className="comments">{com.content}, {com.creator.username} </div>
                <Moment fromNow>{com.created_at}</Moment>
              </div>
            ))
            }

          </div>
          <form id="form_add_comments" className="form" onClick={this.focusCommentInput}>
            <div className="comments-placeholder-wrapper">
              <div className="comments-placeholder">Your comment...</div>
            </div>
            <div className="input-comment-wrapper">
              <div contentEditable="true" className="input-comment" id="input_comment" 
                ref={this.commentInput} onKeyUp={this.handleKey}>
               
              </div>
            </div>
            <button onClick={this.handleClick}>Post</button>
          </form>
        </section>
      )
    }
  }

  export default Comments 