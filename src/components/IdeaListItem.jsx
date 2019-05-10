import React, {Component} from "react"
import DraftEdit from "./DraftEdit"
import UpvoteDownvote from "../components/UpvoteDownvote";

// accepts props:
// {...idea} --> directly reference any keys on "idea"
// loggedUser  --> a user object that represents the *current* logged-in user
// isMine      --> Boolean; if true && !props.isPublic --> show draft/edit
            // else --> show upvote/downvote

// .isPublic is boolean true === "published", false === "draft"
// if status === false:   --> displays DraftEdit component
// if status === true:    --> displays Upvote component

class ideaItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isDraft : props.isPublic
    }
    console.log("idea list item props ", props)
  }
  
  render() {
    return (
      <div className="ideaItem">
        {/* MY DRAFTS */}
        {!this.props.isPublic ? 
        <div className="draftItem">
          <a className="listDraftLink" href={`/create-idea/${this.props._id}`}>{this.props.title}</a>
          <div className="listIdeaDescription">{this.props.description}</div>
          <DraftEdit id={this.props._id} /> 
          {console.log("this is a draft item.  this.props.isPublic: ", this.props.isPublic)}
        </div>
        : 
        <div className="publicItem">
          <a className="listTitleLink" href={`/idea/${this.props._id}`}>{this.props.title}</a>
          <div className="listIdeaDescription">{this.props.description}</div>
          <p className="ideaCreator">Creator: <a href={`/@${this.props.creator && this.props.creator.name}`}>{this.props.creator && this.props.creator.name}</a></p>
          <UpvoteDownvote ideaId={this.props._id} loggedUser={this.props.loggedUser} />
        </div>
        }

        {/* {!this.props.isMine && <UpvoteDownvote ideaId={this.props._id} loggedUser={this.props.loggedUser} />} */}

        {/* add check for this.props.isPublic */}
        {/* <DraftEdit id={this.props._id} /> */}
      </div>
    )
  }
}

export default ideaItem
