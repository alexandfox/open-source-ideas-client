import React, {Component} from "react"
import DraftEdit from "./DraftEdit"
import { Link } from "react-router-dom";
import UpvoteTest from "../components/UpvoteTest"
import SharedOptions from "../components/myIdeaOptions"

// accepts props:
// {...idea} --> directly reference any keys on "idea"
// loggedUser  --> a user object that represents the *current* logged-in user
// isMine      --> Boolean; if true && !props.isPublic --> show draft/edit
            // else --> show upvote/downvote

// .isPublic is boolean true === "published", false === "draft"
// if status === false:   --> displays DraftEdit component
// if status === true:    --> displays Upvote component

// onDelete --> a function that updates the parent component (user)

class ideaItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isDraft : props.isPublic
    }
    // console.log("idea list item props ", props)
  }

  sendToParent = (e) => {
    this.props.onDelete(e)
  }
  
  render() {
    var idea = {...this.props}
    return (
      <div className="ideaItem">
        {/* MY DRAFTS */}
        {!this.props.isPublic ? 
        <div className="draftItem">
          <Link className="listDraftLink" to={`/create-idea/${this.props._id}`}>{this.props.title}</Link>
          <div className="listIdeaDescription">{this.props.description}</div>
          <DraftEdit id={this.props._id} creator_name={this.props.creator && this.props.creator.name} sendToParent={(e) => this.sendToParent(e)} /> 
        </div>
        : 
        <div className="publicItem">
          <Link className="listTitleLink" to={`/idea/${this.props._id}`}>{this.props.title}</Link>
          <div className="listIdeaDescription">{this.props.description}</div>
          <p className="ideaCreator">Creator: <Link className="listPublicLink" to={`/@${this.props.creator && this.props.creator.name}`}>{this.props.creator && this.props.creator.name}</Link></p>
          {/* <UpvoteDownvote ideaId={this.props._id} loggedUser={this.props.loggedUser} /> */}
          {/* <UpvoteTest id={this.props._id} loggedUser={this.props.loggedUser} /> */}
          <UpvoteTest idea={idea} loggedUser={this.props.loggedUser} />
          {/* <SharedOptions id={this.props._id} sendToParent={(e) => this.sendToParent(e)}/> */}
        </div>}
      </div>
    )
  }
}

export default ideaItem
