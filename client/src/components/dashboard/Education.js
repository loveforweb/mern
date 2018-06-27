import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  handleDelete(id) {
    this.props.deleteEducation(id);
  }

  render() {
    let education;

    if (this.props.education) {
      education = this.props.education.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="DD/MM/YYYY"> {edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={this.handleDelete.bind(this, edu._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      education = <p>No education added</p>;
    }

    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    deleteEducation
  }
)(Education);
