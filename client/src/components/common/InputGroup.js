import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  error,
  handleChange,
  icon,
  name,
  placeholder,
  type,
  value
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
};

export default InputGroup;
