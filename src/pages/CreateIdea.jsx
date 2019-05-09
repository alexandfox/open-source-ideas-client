import React from "react"
import FormCreateIdea from "../components/form-idea/FormCreateIdea"

function CreateIdea(props) {
  return (
    <div>
      <h1>Share your Idea</h1>
      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eius, voluptate rerum excepturi harum perferendis neque atque explicabo obcaecati!</h3>

      {/* Need to pass the _id if it's a draft */}
      <FormCreateIdea {...props} />
    </div>
  )
}

export default CreateIdea