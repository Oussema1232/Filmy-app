import React, { useEffect, useState, createContext } from "react";
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
import ThemeContext from "./commun/context/themeContext";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();
  const [lightmode, setLightmode] = useState(false);
  const [theme, setTheme] = useState({
    mode: "dark",
    color: "#eee",
    createButton: "info",
    deleteButton: "danger",
    tableColor: "primary",
  });

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  const changeTheme = () => {
    setLightmode(!lightmode);
    setTheme(
      !lightmode
        ? {
            mode: "light",
            color: "black",
            createButton: "warning",
            deleteButton: "success",
            tableColor: "secondary",
          }
        : {
            mode: "dark",
            color: "#eee",
            createButton: "info",
            deleteButton: "danger",
            tableColor: "primary",
          }
    );
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={`container-fluid bg-${theme.mode}`}
        style={{ height: "100vh", padding: 10, color: theme.color }}
      >
        <ToastContainer />
        <NavBar user={user} lightmode={lightmode} changeTheme={changeTheme} />
        <Switch>
          <ProtectedRoute path="/movies/:id" component={MovieForm} />

          <Route path="/rentals" component={Rentals} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
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
    </ThemeContext.Provider>
  );
}

export default App;
