import React, {Component} from "react"
import DraftEdit from "./DraftEdit"
import { Link } from "react-router-dom";
import UpvoteTest from "../components/UpvoteTest"
import SharedOptions from "../components/myIdeaOptions"
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OnVisible from 'react-on-visible';

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
      <React.Fragment>
        {/* MY DRAFTS */}
        {!this.props.isPublic ? 
        <div className="draftItem">
          <Link className="listDraftLink" to={`/create-idea/${this.props._id}`}>{this.props.title}</Link>
          <div className="listIdeaDescription">{this.props.description}</div>
          <DraftEdit id={this.props._id} creator_name={this.props.creator && this.props.creator.name} sendToParent={(e) => this.sendToParent(e)} /> 
        </div>
        : 
        <OnVisible className="publicItem" percent={5}>
          <div className="publicItemInfos">
            <div className="publicItemInfosPrimary">
              <p className="publicItemCat">CATEGORY / <span className="publicItemCatName">{this.props.category}</span></p>
              <Link to={`/idea/${this.props._id}`}>
                <h2 className="publicItemTitle">{this.props.title.length > 35 ? this.props.title.slice(0,35)+"[...]" : this.props.title}</h2>
              </Link>
              <div className="publicItemDescription">{this.props.description.length > 75 ? this.props.description.slice(0,75)+" [...]" : this.props.description }</div>
            </div>
            
            <div className="publicItemInfosSecondary">
              <div>
                <p className="publicItemCreator"><Link className="listPublicLink" to={`/@${this.props.creator && this.props.creator.name}`}>{this.props.creator && this.props.creator.name}</Link></p>
              </div>
              <div className="publicItemInfosSecondaryRight">
                <FontAwesomeIcon icon="comment" className="publicItemCommentIcon"/>
                <p className="publicItemCommentsCount">{this.props.comments.length}</p>
                <Moment className="publicItemDate" fromNow>{this.props.created_at}</Moment>
              </div>
            </div>
            {/* {this.props.creator._id === this.props.loggedUser._id && <SharedOptions id={this.props._id} sendToParent={(e) => this.sendToParent(e)}/>} */}
          </div>

          <div className="publicItemUpvote">
            <UpvoteTest idea={idea} loggedUser={this.props.loggedUser} />
          </div>
        </OnVisible>}
      </React.Fragment>
    )
  }
}

export default ideaItem
