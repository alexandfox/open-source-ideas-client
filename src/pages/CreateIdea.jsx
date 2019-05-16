import React from "react"
import FormCreateIdea from "../components/form-idea/FormCreateIdea"

function CreateIdea(props) {
  console.log("create idea page props: ", props)
  return (
    <div>
      <h1>Share your Idea</h1>
      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eius, voluptate rerum excepturi harum.</h3>
      <FormCreateIdea {...props} sendToParent={props.updateApp} />
    </div>
  )
}

export default CreateIdea