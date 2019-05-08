import React from "react"

function ideaItem(props) {
  return (
    <div className="ideaItem">
      <p className="ideaTitle">Title: <span>{props.title}</span></p>
			{/* <p className="ideaCreator">Creator: <span>{props.creator.name}</span></p> */}
    </div>
  )
}

export default ideaItem