import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import Cobrancas from "./pages/Cobranca";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Lista_produtos from "./pages/Produtos/lista.js";
import Header from './pages/Header'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/SignUp" component={SignUp} />
            <Route exact path="/" component={SignIn} />

          </Switch>
          
          <Header/>
          <Switch>
            <PrivateRoute path="/Home" component={Dashboard} />
            <PrivateRoute path="/users" component={Users} />
            <PrivateRoute path="/add_Produtos/:id" component={Produtos} />
            <PrivateRoute path="/add_Produtos" component={Produtos} />
            <PrivateRoute path="/Produtos" component={Lista_produtos} />
            <PrivateRoute path="/Cobrancas" component={Cobrancas} />
            
            <Route path="*" component={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
