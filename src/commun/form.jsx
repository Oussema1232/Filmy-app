import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {}, genres: [] };

  onchange = ({ currentTarget: input }) => {
    let data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = this.validateProprety(input.name, input.value);
    this.setState({ data, errors: errors || {} });
  };

  validation = () => {
    const options = { abortEarly: false };
    const data = this.state.data;
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.map((err) => (errors[err.path[0]] = err.message));
    return errors;
  };

  validateProprety = (name, value) => {
    const schema = { [name]: this.schema[name] };
    const data = { [name]: value };
    const { error } = Joi.validate(data, schema);
    if (!error) return null;
    const errors = {};
    errors[name] = error.details[0].message;
    return errors;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    if (errors) this.setState({ errors } || {});

    this.dosubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        error={errors[name]}
        value={data[name]}
        onChange={this.onchange}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        onClick={this.onSubmit}
        disabled={this.validation()}
      >
        {label}
      </button>
    );
  };

  renderSelect = (name, label) => {
    const { genres, errors, data } = this.state;
    return (
      <Select
        options={genres}
        name={name}
        label={label}
        errors={errors[name]}
        value={data[name]}
        onChange={this.onchange}
      />
    );
  };
}

export default Form;
