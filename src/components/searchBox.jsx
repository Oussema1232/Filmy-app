import React from "react";

const SearchBox = ({ name, label, onChange, value }) => {
  return (
    <div className="form-group">
      <label forhtml={name}>{label}</label>
      <input
        name={name}
        className="form-control"
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
