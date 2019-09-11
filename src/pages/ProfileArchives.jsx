import React, {Component} from "react"
import IdeaItem from "../components/IdeaListItem"

// this is the user's archived ideas
// gets loggedUser from props

class myArchives extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    console.log("archive props: ", props)
    console.log("archive state: ", this.state)
  
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
}

export default myArchives