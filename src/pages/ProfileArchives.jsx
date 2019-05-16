import React from "react"
import IdeaItem from "../components/IdeaListItem"

// this is the user's archived ideas
// gets loggedUser from props

function myArchives(props) {
	console.log("archive props: ", props)

	return(
		<div>
			<h3>ARCHIVED IDEAS</h3>
			<div>
				{props.location.archives.map( (idea, index) => (
					<IdeaItem key={index} {...idea} loggedUser={props.location.loggedUser} />
				))}
			</div>
		</div>
	)
}

export default myArchives