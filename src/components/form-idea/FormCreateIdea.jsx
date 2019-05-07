import React, { Component } from 'react';
import Button from "./Button";
import AddCategories from "./AddCategories";

class FormCreateIdea extends Component {

  render() {
    return (
      <form
        id="form_product"
        className="form">
        <label htmlFor="idea-title">Title</label>
        <input type="text" placeholder="The Holly Nut" />
        <label htmlFor="idea-title">Description</label>
        <input type="text" placeholder="Description" />
        <AddCategories />
        <Button button_name="ok"/>
      </form>
    )
  }
}

export default FormCreateIdea 