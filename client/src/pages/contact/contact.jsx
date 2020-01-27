import React, { Component } from "react";
import "./contact.style.scss";
import Input from "../../components/CustomInput/custom.input.component";
import TextArea from "../../components/custom.textarea/custom.textarea.component";
import Dropdown from "../../components/html.select/select.component";
import Button from "../../components/button/button.component";
import GoogleMap from "google-map-react";
import axios from "axios";

export class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Firstname: "",
      Lastname: "",
      state: "",
      city: "",
      enquiry: "",
      details: "",
      contact: "",
      contact_details: "",
      enquiry_status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static defaultProps = {
    center: { lat: 40.73, lng: -73.93 },
    zoom: 12,
    key: "AIzaSyAZvtWbnLIK_MqfWLEW8MuslOFLjbxNq-A"
  };

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const {
      Firstname,
      Lastname,
      state,
      city,
      details,
      contact,
      contact_details,
      enquiry
    } = this.state;
    event.preventDefault();
    const body = {
      name: `${Firstname} ${Lastname}`,
      state,
      city,
      details,
      contact,
      contact_details,
      enquiry
    };

    axios
      .post("/api/customer", body)
      .then(res =>
        this.setState({
          Firstname: "",
          Lastname: "",
          state: "",
          city: "",
          enquiry: "",
          details: "",
          contact: "",
          contact_details: "",
          enquiry_status: res.data
        })
      )
      .catch(err =>
        this.setState({
          Firstname: "",
          Lastname: "",
          state: "",
          city: "",
          enquiry: "",
          details: "",
          contact: "",
          contact_details: "",
          enquiry_status: err
        })
      );
  }

  render() {
    return (
      <div className="ContactContainer">
        <h1>Contact Us</h1>
        {this.state.enquiry_status ? (
          <h4>{this.state.enquiry_status}</h4>
        ) : null}
        <div className="Contact">
          <form onSubmit={this.handleSubmit} className="ContactUs">
            <Input
              isRequired={true}
              name="Firstname"
              onChange={event => this.handleChange(event)}
              value={this.state.Firstname}
              type="text"
            />
            <Input
              isRequired={true}
              name="Lastname"
              onChange={event => this.handleChange(event)}
              value={this.state.Lastname}
              type="text"
            />
            <Input
              isRequired={true}
              name="state"
              onChange={event => this.handleChange(event)}
              value={this.state.state}
              type="text"
            />
            <Input
              isRequired={true}
              name="city"
              onChange={event => this.handleChange(event)}
              value={this.state.city}
              type="text"
            />
            <Dropdown
              isRequired={true}
              label="Enquire About"
              options={["", "Fabric", "Accessories", "Longrich"]}
              onChange={event => this.handleChange(event)}
              value={this.state.enquiry}
              name="enquiry"
            />
            <TextArea
              placeholder="Enquire Details"
              isRequired={true}
              name="details"
              onChange={event => this.handleChange(event)}
              value={this.state.details}
            />
            <Dropdown
              isRequired={true}
              label="Contact Details"
              options={["", "WhatsApp", "Call", "Messanger", "Email"]}
              onChange={event => this.handleChange(event)}
              value={this.state.contact}
              name="contact"
            />
            <Input
              isRequired={true}
              name="contact_details"
              onChange={event => this.handleChange(event)}
              value={this.state.contact_details}
              type="text"
            />
            <div>
              <Button type="" style={{ width: "4rem", marginLeft: "1rem" }}>
                Submit
              </Button>
            </div>
          </form>
          <div className="ContactDetails">
            <h1>Contact Details</h1>
            <p className="FooterAddresses">
              <span className="FooterIcon">
                <i className="fas fa-mobile-alt"></i>
              </span>
              {"  "}
              <span className="FooterAddress">08065288667</span>
            </p>
            <p className="FooterAddresses">
              <span className="FooterIcon">
                {" "}
                <i className="fas fa-envelope"></i>
              </span>
              {"  "}
              <span className="FooterAddress">lorem@gmail.com</span>
            </p>
            <div className="GoogleMap">
              <GoogleMap
                bootstrapURLKeys={{
                  key: this.props.key,
                  language: "en"
                }}
                defaultCenter={this.props.center}
                center={this.state.center}
                defaultZoom={this.props.zoom}
                onChildMouseEnter={this.onChildMouseEnter}
                onChildMouseLeave={this.onChildMouseLeave}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
