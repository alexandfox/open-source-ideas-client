import React from "react"

function ideaItem(props) {
  return (
    <div className="ideaItem">
      <a className="listTitleLink" href={`/idea/${props._id}`}>{props.title}</a>
      <div className="listIdeaDescription">{props.description}</div>
			{/* <p className="ideaCreator">Creator: <span>{props.creator.name}</span></p> */}
    </div>
  )
}

export default ideaItem