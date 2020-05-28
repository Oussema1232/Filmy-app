import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeContext from "../commun/context/themeContext";

function NavBar({ user, lightmode, changeTheme }) {
  const theme = useContext(ThemeContext);
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${theme.mode} bg-${theme.mode}`}
    >
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
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="theme"
          checked={lightmode}
          onChange={changeTheme}
        />
        <label className="custom-control-label" for="theme"></label>
      </div>
    </nav>
  );
}

export default NavBar;
