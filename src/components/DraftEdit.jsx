import React, {Component} from "react"
// import Button from "./form-idea/Button"
import {deleteOneIdea} from "../api/apiHandler";
import {Redirect} from "react-router-dom";

// this component will render edit/ delete buttons
// EDIT --> goes to CREATE IDEA PAGE (sends idea info) from parent
// DELETE --> prompts DIALOGUE box to confirm --> on confirm --> removes idea from user, from DB

class editDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      edit: false,
      delete: false,
    }
  }

  // should populate with idea page
  editSubmit = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true,
      edit: true,
    })
  }

  // should delete the idea from user and DB
  deleteSubmit = (e) => {
    e.preventDefault();
    // axios delete method
    deleteOneIdea(this.props.id)
    .then(res => {
      this.setState({
        delete: true,
      }, console.log("it has been deleted: ", res))
    })
    .catch(err => {
      console.log("error creating on save create", err.response);
    })
  }

  render() {
    if (this.state.redirect && this.state.edit) {return <Redirect to={`/create-idea/${this.props.id}`}/>}
    return (
      <div className="editDelete">
        <button className="iconButton edit" onClick={this.editSubmit} >Edit</button>
        <button className="iconButton delete" onClick={this.deleteSubmit} >Delete</button>
      </div>
    )
  }
}

export default editDelete