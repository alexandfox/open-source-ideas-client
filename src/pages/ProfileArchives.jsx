import React from "react"
import IdeaItem from "../components/IdeaListItem"
import { arch } from "os";

// this is the user's archived ideas
// gets loggedUser from props

function myArchives(props) {
	console.log("props: ", props)
	var archivedIdeas = props.loggedUser.myIdeas.filter(idea => idea.isArchived)

	console.log("archived ideas: ", archivedIdeas)
	return(
		<div>
			this is the archives
			<h3>ARCHIVED IDEAS</h3>
			<div>
				{archivedIdeas.map( (idea, index) => (
					<IdeaItem key={index} {...idea} loggedUser={this.props.loggedUser} />
				))}
			</div>
		</div>
	)
}

export default myArchives