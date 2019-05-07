import React, { Component } from 'react';
import Button from "./Button";
import AddCategories from "./AddCategories";
import {createOneIdea} from "../../api/apiHandler";
import {Redirect} from "react-router-dom";

class FormCreateIdea extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: "",
      description: "",
      redirect: false,
      createdIdeaId: ""
    }
  }

  handleInput = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    createOneIdea(this.state)
    .then(res => {
      this.setState({ 
        redirect: true, 
        createdIdeaId: res.data.dbSuccess._id
      })
    })
    .catch(err => {
      console.log("ici", err.response);
    })
  }

  render() {
    if (this.state.redirect) {return <Redirect to={`/idea/${this.state.createdIdeaId}`}/>}
    return (
      <form
        id="form_product"
        className="form"
        onSubmit={this.handleSubmit}>
        <label htmlFor="idea-title">Title</label>
        <input 
          value={this.state.title} 
          name="title" 
          type="text" 
          placeholder="The Holy Nut"
          onChange= {this.handleInput} 
          />
        <label htmlFor="idea-title">Description</label>
        <input 
          value={this.state.description} 
          name="description" 
          type="text" 
          placeholder="Description" 
          onChange= {this.handleInput} 
          />
        <AddCategories />
        <Button button_name="Save"/>
        <div>{this.state.title}</div>
        <div>{this.state.description}</div>
      </form>
    )
  }

  componentWillUnmount(){
    this.setState({

    })
  }
}

export default FormCreateIdea 