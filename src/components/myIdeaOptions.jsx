import React, {Component} from "react"
import {deleteOneIdea, updateOneIdea} from "../api/apiHandler";

// this component will render a dropdown option
// ARCHIVE --> idea is removed from public (user can access in archives)
// DELETE --> prompts DIALOGUE box to confirm --> on confirm --> removes idea from user, from DB
// Copy Link --> copies to clipboard

class ideaOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
			copy: false,
    }
  }

  archiveSubmit = (e) => {
    updateOneIdea(this.props.id, {
      isArchived: true,
    })
    .then(res => {
      console.log("it has been archived: ", res);
      this.props.sendToParent(e)
    })
    .catch(err => {
      console.log("error on archive: ", err.response);
    })
  }

	deleteSubmit = (e) => {
    deleteOneIdea(this.props.id)
    .then(res => {
      console.log("it has been deleted: ", res);
      this.props.sendToParent(e)
    })
    .catch(err => {
      console.log("error on draft delete: ", err.response);
    })
  }

  handleChange = (e) => {
		if (e.target.value === "copy") {
      console.log("copy")
      // close to default select
    } else if (e.target.value === "archive") {
      var result = window.confirm("Are you sure you want to archive? You will still be able to access this idea, but it will be removed from your profile");
      result === true ? this.archiveSubmit(e) : console.log("canceled archive")
    } else if (e.target.value === "delete") {
      var result = window.confirm("Are you sure you want to delete? You will not be able to access this idea, and it will be removed from your profile");
      result === true ? this.deleteSubmit(e) : console.log("canceled delete")
      // reset dropdown if cancel
    }
	}

	render() {
		return(
			<select onChange={(e) => this.handleChange(e)}>
				<option value="none">...</option>
				<option value="copy">Copy Link</option>
				<option value="archive">Archive</option>
				<option value="delete">Delete</option>
			</select>
		)
	}
}

export default ideaOptions