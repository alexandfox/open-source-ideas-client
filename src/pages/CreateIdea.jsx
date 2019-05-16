import React from "react"
import FormCreateIdea from "../components/form-idea/FormCreateIdea"

function CreateIdea(props) {
  console.log("create idea page props: ", props)
  return (
    <div>
      <div className="create-Heading">
        <h1>have something great to share with the world?</h1>
        <h4>make it happen!</h4>
      </div>
      <FormCreateIdea {...props} sendToParent={props.updateApp} />
    </div>
  )
}

export default CreateIdea