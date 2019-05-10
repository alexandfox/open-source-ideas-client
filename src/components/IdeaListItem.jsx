import React from "react"
// import DraftEdit from "./DraftEdit"
import UpvoteDownvote from "../components/UpvoteDownvote";

function ideaItem(props) {
  // console.log("idea list item props ", props)
  return (
    <div className="ideaItem">
      <a className="listTitleLink" href={`/idea/${props._id}`}>{props.title}</a>
      <div className="listIdeaDescription">{props.description}</div>
      {/* <p className="ideaCreator">Creator: <span>{props.creator.name}</span></p> */}

      <UpvoteDownvote ideaId={props._id} loggedUser={props.loggedUser} />

      {/* <div >{props.loggedUser ? props.loggedUser.name : ""}</div> */}
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