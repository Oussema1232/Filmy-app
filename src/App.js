import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";

import Logout from "./components/logout";
import Movies from "./components/movies";
import NavBar from "./components/NavBar";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import Login from "./components/LoginForm";
import Register from "./components/Register";
import MovieForm from "./components/movieForm";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./commun/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div
        className="container-fluid bg-dark"
        style={{ height: "100vh", padding: 10, color: "#eee" }}
      >
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <ProtectedRoute path="/movies/:id" component={MovieForm} />

          <Route path="/rentals" component={Rentals} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
