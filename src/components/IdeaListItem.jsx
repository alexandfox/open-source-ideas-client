import React from "react"
import DraftEdit from "./DraftEdit"
import UpvoteDownvote from "../components/UpvoteDownvote";

// accepts props:
// {...idea} --> directly reference any keys on "idea"
// loggedUser  --> a user object that represents the *current* logged-in user
// isMine      --> Boolean; if true && !props.isPublic --> show draft/edit
            // else --> show upvote/downvote

function ideaItem(props) {
  console.log("idea list item props ", props)
  return (
    <div className="ideaItem">
      <a className="listTitleLink" href={`/idea/${props._id}`}>{props.title}</a>
      <div className="listIdeaDescription">{props.description}</div>
      <p className="ideaCreator">Creator: <a href={`/@${props.creator && props.creator.name}`}>{props.creator && props.creator.name}</a></p>

      {/* {!props.isMine && <UpvoteDownvote ideaId={props._id} loggedUser={props.loggedUser} />} */}

      {(props.isMine && !props.isPublic) ? <DraftEdit id={props._id} /> : <UpvoteDownvote ideaId={props._id} loggedUser={props.loggedUser} />}

      {/* add check for props.isPublic */}
      {/* <DraftEdit id={props._id} /> */}
    </div>
  )
}

export default ideaItem

// Props is an idea OBJECT

// .isPublished is boolean true === "published", false === "draft"
// if status === false:   --> displays DraftEdit component
// if status === true:    --> displays Upvote component