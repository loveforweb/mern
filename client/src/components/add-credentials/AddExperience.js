import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      current: false,
      description: '',
      disabled: false,
      errors: {},
      from: '',
      location: '',
      title: '',
      to: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add job or position that you have has in the pass or current
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  error={errors.company}
                  onChange={this.handleChange}
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                />

                <TextFieldGroup
                  error={errors.title}
                  onChange={this.handleChange}
                  name="title"
                  placeholder="* Job title"
                  value={this.state.title}
                />

                <TextFieldGroup
                  error={errors.location}
                  onChange={this.handleChange}
                  name="location"
                  placeholder="* Location"
                  value={this.state.location}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  error={errors.from}
                  onChange={this.handleChange}
                  name="from"
                  type="date"
                  value={this.state.from}
                />

                <h6>To Date</h6>
                <TextFieldGroup
                  disabled={this.state.disabled ? 'disabled' : ''}
                  error={errors.to}
                  onChange={this.handleChange}
                  name="to"
                  type="date"
                  value={this.state.to}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  error={errors.description}
                  onChange={this.handleChange}
                  info="Tell us about your position"
                  name="description"
                  placeholder="Job Description"
                  value={this.state.description}
                />

                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
