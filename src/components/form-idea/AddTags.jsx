import React, { Component } from "react";


class AddTags extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      inputWidth: 2,
      currentInputLength: 1,
      tags: [],

    }
  }

  componentWillReceiveProps(toto) {
    this.setState({ tags: toto.tags });  
  }

  // componentDidMount() {
  //   console.log("hello", this.props.tags)
  //   this.setState({tags : this.props.tags})
  // }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  handleKey = (evt) => {

    if (evt.key === "Enter") {
      evt.preventDefault();
      if (!evt.target.value) return;
      let tmp = this.state.tags;
      // console.log(tmp)
      tmp.push(evt.target.value);
      this.setState({ tags: tmp });
      evt.target.value = "";
    } else {
      // console.log(evt)
      const w = this.textInput.current.getBoundingClientRect().width;
      // const target = evt.target;
      this.setState({ inputWidth: w})
    }
  }

  
  render() {
    const {inputWidth, tags } = this.state;
    return (
      <React.Fragment>
        <div className="tags-big-wrapper" onBlur={() => this.props.sendDataToParent(tags)}>
          <div className="tags-wrapper" onClick={this.focusTextInput}>
            {/* <div className="tags-input-placeholder">add your tags</div> remove onclick adding class to parent*/}
            <ul className="list tags">
              {
                tags.map((tag, index) => (
                  <li key={index} value={tag} className="tag">{tag}</li>
                ))
              }
            </ul>
            <div className="tags-wrapper-input">
              <input
                className="tags-input"
                type="text" onKeyPress={this.handleKey}
                style={{ width: `${inputWidth}px` }}
                ref={this.textInput}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AddTags