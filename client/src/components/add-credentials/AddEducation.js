import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: false,
      degree: '',
      description: '',
      disabled: false,
      errors: {},
      fieldofstudy: '',
      from: '',
      school: '',
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

    const eduData = {
      current: this.state.current,
      degree: this.state.degree,
      description: this.state.description,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      school: this.state.school,
      to: this.state.to
    };

    this.props.addEducation(eduData, this.props.history);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  error={errors.school}
                  onChange={this.handleChange}
                  name="school"
                  placeholder="* School"
                  value={this.state.school}
                />

                <TextFieldGroup
                  error={errors.degree}
                  onChange={this.handleChange}
                  name="degree"
                  placeholder="* Degree"
                  value={this.state.degree}
                />

                <TextFieldGroup
                  error={errors.fieldofstudy}
                  onChange={this.handleChange}
                  name="fieldofstudy"
                  placeholder="* Field of study"
                  value={this.state.fieldofstudy}
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
                    Current School
                  </label>
                </div>

                <TextAreaFieldGroup
                  error={errors.description}
                  onChange={this.handleChange}
                  info="Tell us about the program that you were in"
                  name="description"
                  placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
