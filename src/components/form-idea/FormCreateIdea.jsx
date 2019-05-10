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
      creator: props.loggedUser ? props.loggedUser._id : "",
      upvotedUsers: props.loggedUser ? [props.loggedUser._id] : "",
      existingIdea: false,
    }
    // console.log("form idea props: ", props)
  }

  componentDidMount() {
    !this.state.createdIdeaId ? console.log("no id in url") : (getOneIdea(this.state.createdIdeaId)
        .then(res => {
          console.log(res.data)
          this.setState({
            title: res.data.idea.title,
            description: res.data.idea.description,
            category: res.data.idea.category,
            tags: res.data.idea.tags,
            existingIdea: true,
          })
          // console.log(`state tags:`, this.state.tags)
        })
        .catch(err => {
          console.log("ici2", err.response);
        }))
  }

  handleInput = (evt) => {
    // console.log(this.state)

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

    // if its a new idea --> create; if it's an existing --> update
    this.state.existingIdea ? 
    updateOneIdea(this.state.createdIdeaId, {...this.state, isPublic: false})
    .then(res => {
        this.setState({
          redirect: true,
          createdIdeaId: this.state.createdIdeaId
        })
      })
      .catch(err => {
        console.log("error creating on save update", err.response);
      }) 
    : createOneIdea({...this.state, isPublic: false})
    .then(res => {
        this.setState({
          redirect: true,
          createdIdeaId: res.data.dbSuccess._id
        })
      })
      .catch(err => {
        console.log("error creating on save create", err.response);
      })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { title, description, category, tags } = this.state;
    if (!title || !description || !category || !tags.length) {
      return console.log("nope")
    }

    createOneIdea({...this.state, isPublic: true})
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
        <AddTags sendDataToParent={this.handleTags} tags={this.state.tags} />
        <Button button_name="Save" onClick={this.handleSave} />
        <Button button_name="Submit" onClick={this.handleSubmit} />
        <div>{this.state.title}</div>
        <div>{this.state.description}</div>
      </form>
    )
  }

}

export default FormCreateIdea 