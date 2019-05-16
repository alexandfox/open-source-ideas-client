import React, {Component} from "react";
import ReactDOM from "react-dom";

const modalRoot = document.querySelector("#modal")

class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hi : "hi"
		}
	}

	div = document.createElement("div")
	componentDidMount() {
		modalRoot.appendChild(this.div)
		console.log("modal rendered")
	} 

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props !== prevProps) {
  //     this.setState({
  //       hi : "again",
  //     })
  //   }
  // }

	componentWillUnmount() {
		modalRoot.removeChild(this.div)
	}
  render() {
		return ReactDOM.createPortal(
			<div
					style={{
						position: 'absolute',
						top: '0',
						bottom: '0',
						left: '0',
						right: '0',
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.3)',
					}}
					onClick={this.props.onClose}
				>
					<div
						style={{
							padding: 20,
							background: '#fff',
							borderRadius: '2px',
							display: 'inline-block',
							minHeight: '300px',
							margin: '1rem',
							position: 'relative',
							minWidth: '300px',
							boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
							justifySelf: 'center',
						}}
					>
						Here's some content
						<hr />
						<button onClick={this.props.onClose}>Close</button>
					</div>
				</div>
		, this.div);
	}
}


export default Modal;