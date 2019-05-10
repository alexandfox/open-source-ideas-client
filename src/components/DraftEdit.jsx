import React, {Component} from "react"
// import Button from "./form-idea/Button"
// import {updateOneIdea} from "../api/apiHandler";
import {Redirect} from "react-router-dom";

// this component will render edit/ delete buttons
// EDIT --> goes to CREATE IDEA PAGE (sends idea info) from parent
// DELETE --> prompts DIALOGUE box to confirm --> on confirm --> removes idea from user, from DB

class editDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // should populate with idea page
  editSubmit = (e) => {
    e.preventDefault();
    return <Redirect to={`/idea/${this.props.id}`}/>
  }

  // should delete the idea from user and DB
  deleteSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="editDelete">
        <button className="iconButton edit">Edit</button>
        <button className="iconButton delete">Delete</button>
      </div>
    )
  }
}

export default editDelete