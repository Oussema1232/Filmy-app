import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Filmy
      </Link>
      <NavLink className="nav-item nav-link" to="/movies">
        Movies
      </NavLink>
      <NavLink className="nav-item nav-link" to="/customers">
        Customers
      </NavLink>
      <NavLink className="nav-item nav-link" to="/rentals">
        Rentals
      </NavLink>

      {user ? (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/">
            {user.name}
          </NavLink>
          <NavLink className="nav-item nav-link" to="/logout">
            logout
          </NavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
}

export default NavBar;
