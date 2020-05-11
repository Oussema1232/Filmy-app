import React from "react";

const Select = ({ options, name, label, errors, value, onChange }) => {
  return (
    <div className="form-group">
      <label forhtml={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        onChange={onChange}
        value={value}
        name={name}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.genre}
          </option>
        ))}
      </select>
      {errors && <div className="aler alert-danger">{errors}</div>}
    </div>
  );
};

export default Select;
