import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Skills array to string
      const skillsCSV = profile.skills.join(',');

      // If profile field doesn't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set state to prefill form fields
      this.setState({
        bio: profile.bio,
        company: profile.company,
        facebook: profile.facebook,
        githubusername: profile.githubusername,
        handle: profile.handle,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        location: profile.location,
        skills: skillsCSV,
        status: profile.status,
        twitter: profile.twitter,
        website: profile.website,
        youtube: profile.youtube
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const profileData = {
      bio: this.state.bio,
      company: this.state.company,
      facebook: this.state.facebook,
      githubusername: this.state.githubusername,
      handle: this.state.handle,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      location: this.state.location,
      skills: this.state.skills,
      status: this.state.status,
      twitter: this.state.twitter,
      website: this.state.website,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            error={errors.twitter}
            onChange={this.handleChange}
            icon="fab fa-twitter"
            name="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
          />

          <InputGroup
            error={errors.facebook}
            onChange={this.handleChange}
            icon="fab fa-facebook"
            name="facebook"
            placeholder="Facebook Profile URL"
            value={this.state.facebook}
          />

          <InputGroup
            error={errors.linkedIn}
            onChange={this.handleChange}
            icon="fab fa-linkedin"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={this.state.linkedin}
          />

          <InputGroup
            error={errors.youtube}
            onChange={this.handleChange}
            icon="fab fa-youtube"
            name="youtube"
            placeholder="YouTube Profile URL"
            value={this.state.youtube}
          />

          <InputGroup
            error={errors.instagram}
            onChange={this.handleChange}
            icon="fab fa-instagram"
            name="instagram"
            placeholder="Instagram Profile URL"
            value={this.state.instagram}
          />
        </div>
      );
    }

    const options = [
      {
        label: '* Select Professional Status',
        value: 0
      },
      {
        label: 'Developer',
        value: 'Developer'
      },
      {
        label: 'Junior Developer',
        value: 'Junior Developer'
      },
      {
        label: 'Senior Developer',
        value: 'Senior Developer'
      },
      {
        label: 'Manager',
        value: 'Manager'
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>

              <h1 className="display-4 text-center">Edit your profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  error={errors.handle}
                  onChange={this.handleChange}
                  info="A unique handle ofor your URL. Your full name, company name, nickname etc"
                  name="handle"
                  placeholder="* Profile Handle"
                  value={this.state.handle}
                />

                <SelectListGroup
                  error={errors.status}
                  onChange={this.handleChange}
                  info="Give us details on what you do"
                  name="status"
                  options={options}
                  placeholder="* Status"
                  value={this.state.status}
                />

                <TextFieldGroup
                  error={errors.company}
                  onChange={this.handleChange}
                  info="COuld be your own company or one you work for"
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                />

                <TextFieldGroup
                  error={errors.website}
                  onChange={this.handleChange}
                  info="Could be your own website or a company one"
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                />

                <TextFieldGroup
                  error={errors.location}
                  onChange={this.handleChange}
                  info="City or city &amp; state suggested"
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                />

                <TextFieldGroup
                  error={errors.skills}
                  onChange={this.handleChange}
                  info="Please use commas separated values (eg. HTML, CSS, JS)"
                  name="skills"
                  placeholder="* Skills"
                  value={this.state.skills}
                />

                <TextFieldGroup
                  error={errors.githubusername}
                  onChange={this.handleChange}
                  info="If you want your latest repos and Github link, include your username"
                  name="githubusername"
                  placeholder="Github Username"
                  value={this.state.githubusername}
                />

                <TextAreaFieldGroup
                  error={errors.bio}
                  onChange={this.handleChange}
                  info="Tell us about yourself"
                  name="bio"
                  placeholder="Your Bio"
                  value={this.state.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-clock mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
