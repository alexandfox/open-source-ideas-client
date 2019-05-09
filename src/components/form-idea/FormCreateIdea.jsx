import React, { Component } from 'react';
import Button from "./Button";
import AddCategories from "./AddCategories";
import AddTags from "./../form-idea/AddTags"
import { createOneIdea, updateOneIdea, getOneIdea } from "../../api/apiHandler";
import { Redirect } from "react-router-dom";

class FormCreateIdea extends Component {
  constructor(props) {
    super(props)
    const checkId = props.match.params.id;
    this.state = {
      title: "",
      description: "",
      redirect: false,
      category: "",
      createdIdeaId: checkId || "",
      tags: [],
      creator_name: props.loggedUser ? props.loggedUser.name : "",
      creator: props.loggedUser ? props.loggedUser._id : ""
    }
    // console.log("form idea props: ", props.match.params.id)
  }

  componentDidMount() {
    getOneIdea(this.state.createdIdeaId)
      .then(res => {
        console.log(res.data)
        this.setState({
          title: res.data.idea.title,
          description: res.data.idea.description,
          category: res.data.idea.category,
          tags: res.data.idea.tags
        })
        // console.log(`state tags:`, this.state.tags)
      })
      .catch(err => {
        console.log("ici", err.response);
      })
  }

  handleInput = (evt) => {
    console.log(this.state)

    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleTags = (tags) => {
    // console.log("parent!!!", tags)
    this.setState({
      tags: tags
    })
    // console.log(this.state)
  }

  handleSave = (evt) => {
    evt.preventDefault();
    updateOneIdea()
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { title, description, category, tags } = this.state;
    if (!title || !description || !category || !tags.length) {
      return console.log("nope")
    }

    createOneIdea(this.state)
      .then(res => {
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
    if (this.state.redirect) { return <Redirect to={`/idea/${this.state.createdIdeaId}`} /> }
    // console.log("heyyyy", this.state.category)
    return (
      <form id="form_product" className="form" >
        <label htmlFor="idea-title">Title</label>
        <input
          value={this.state.title}
          name="title"
          type="text"
          placeholder="The Holy Nut"
          onChange={this.handleInput}
        />
        <label htmlFor="idea-title">Description</label>
        <input
          value={this.state.description}
          name="description"
          type="text"
          placeholder="Description"
          onChange={this.handleInput}
        />
        <AddCategories sendCatToParent={this.handleInput} category={this.state.category} {...this.props} />
        <AddTags sendDataToParent={this.handleTags} tags={this.state.tags}/>
        <Button button_name="Save" onClick={this.handleSave} />
        <Button button_name="Submit" onClick={this.handleSubmit} />
        <div>{this.state.title}</div>
        <div>{this.state.description}</div>
      </form>
    )
  }
  /// do the autoupvote
  componentWillUnmount() {
    this.setState({

    })
  }
}

export default FormCreateIdea 