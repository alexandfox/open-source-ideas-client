import React, { Component } from "react";
import data from "./../../dataCategories"
// import { getEnabledCategories } from "trace_events";


class AddCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: data.categories,
      // category: ""
    }

  }

  // componentDidMount() {
  //   this.setState({ category: this.props.idea });
  // }


  render() {
    // console.log("addCat props---:", this.props.match.params.id)
    return (
      <React.Fragment>
        <select name="category" className="formSelect" onChange={this.props.sendCatToParent} value={this.props.category} >
          { !this.props.match.params.id ? <option value="default">what kind of a thing is it?</option> : null }
          
          {this.state.categories.map((category, index) =>
            (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}

        </select>
      </React.Fragment>)
  }
}



export default AddCategories
