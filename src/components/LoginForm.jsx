import React from "react";
import Joi from "joi-browser";
import auth from "../services/authService";
import Form from "../commun/form";

class Login extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(5),
  };

  dosubmit = async () => {
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
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
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default Login;
