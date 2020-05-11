import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import { createUser } from "../services/userService";
import Form from "../commun/form";

class Register extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().email().required().min(3),
    password: Joi.string().required().min(5),
    name: Joi.string().required().min(4),
  };

  dosubmit = async () => {
    try {
      const { username: email, password, name } = this.state.data;
      const response = await createUser(email, name, password);
      auth.loginWithjwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <form>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default Register;
