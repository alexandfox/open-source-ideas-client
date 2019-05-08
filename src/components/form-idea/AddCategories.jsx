import React, { Component } from "react";
import data from "./../../dataCategories"
// import { getEnabledCategories } from "trace_events";


class AddCategories extends Component {
  
  constructor(props) {
    super(props);
    this.state = { categories: data.categories }
  }


  render() {
    return (
      <React.Fragment>
        <select name="category" id="categories-select" onChange={this.props.sendCatToParent}>
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
