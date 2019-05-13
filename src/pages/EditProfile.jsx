import React, {Component} from "react"
import { updateOneUser } from "../api/apiHandler";
import { Redirect } from "react-router-dom";


// PROPS
// loggedUser --> user

class editProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: false,
			location: "",
			bio: "",
			contact_name: "",
			website: "",
			productHunt: "",
			twitter: "",
			linkedIn: "",
		}
	}

	componentDidMount() {
		this.setState({
			location: this.props.loggedUser.location,
			bio: this.props.loggedUser.bio,
			contact_name: this.props.loggedUser.social ? this.props.loggedUser.social.contact_name : "",
			website: this.props.loggedUser.social ?this.props.loggedUser.social.website: "",
			productHunt: this.props.loggedUser.social ? this.props.loggedUser.social.productHunt: "",
			twitter: this.props.loggedUser.social ? this.props.loggedUser.social.twitter: "",
			linkedIn: this.props.loggedUser.social ? this.props.loggedUser.social.linkedIn: "",
		})
	}

	handleInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

	handleSubmit = evt => {
    evt.preventDefault();
		var { contact_name, website, productHunt, twitter, linkedIn, bio, location} = this.state

		var updateUser = {
			location,
			bio,
			social : {
				contact_name,
				website,
				productHunt,
				twitter,
				linkedIn
			}
		}

    updateOneUser(this.props.loggedUser._id, updateUser)
      .then(res => {
				console.log("here's what was updated: ", updateUser)
        this.setState({
					redirect: true,
				})
      })
      .catch(err => console.error(err.response));
  };

	render() {
		var { contact_name, website, productHunt, twitter, linkedIn, bio, location} = this.state

		if (this.state.redirect) return <Redirect to={`/@${this.props.loggedUser.name}`}/>

		return(
			<div id="edit-profile">
				<img id="upload-profile" src="http://www.bagherra.eu/wp-content/uploads/2016/11/orionthemes-placeholder-image-1.png" alt="profile"/>
				<h3 className="username">@{this.props.loggedUser.name}</h3>

				{/* User Details */}
				<div id="edit-profile-details">
					<label htmlFor="contact_name" className="label">name</label>
					<input id="contact_name" name="contact_name" type="text" className="input" value={contact_name} onChange={this.handleInput}/>
					<label htmlFor="location" className="label">Location</label>
					<input id="location" name="location" type="text" className="input" value={location} onChange={this.handleInput}/>
					<label htmlFor="Bio" className="label">Bio</label>
					<textarea id="Bio" name="bio" className="input" value={bio} onChange={this.handleInput} />
				</div>
				
				{/* Social */}
				<div id="edit-social-details">
					<label htmlFor="website" className="label">Website</label>
					<input id="website" name="website" value={website} type="text" className="input" onChange={this.handleInput}/>
					<label htmlFor="twitter" className="label">twitter</label>
					<input id="twitter" name="twitter" value={twitter} type="text" className="input" onChange={this.handleInput}/>
					<label htmlFor="linkedin" className="label">linkedin</label>
					<input id="linkedin" name="linkedin" value={linkedIn} type="text" className="input" onChange={this.handleInput}/>
					<label htmlFor="productHunt" className="label">Product Hunt</label>
					<input id="productHunt" name="productHunt" value={productHunt} type="text" className="input" onChange={this.handleInput}/>
				</div>

				<button className="button save" onClick={this.handleSubmit}>Save</button>
			</div>
		)
	}
}

export default editProfile
