import React from "react"

// this component will render edit/ delete buttons

function editDelete(props) {
  return (
    <div className="editDelete">
      <a className="listTitleLink" href={`/idea/${props._id}`}>{props.title}</a>
      <div className="listdraftDescription">{props.description}</div>
			{/* <p className="draftCreator">Creator: <span>{props.creator.name}</span></p> */}
    </div>
  )
}

export default editDelete