import React, { Component } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { history } from "./utils/history";
import store from "./store";

import "zent/css/index.css";
import "./assets/css/style.css";

import Login from "./pages/login";
import Forgot from "./pages/forgot";
import MainView from "./component/general/mainView";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import AddUsers from "./pages/user/add";
import EditUser from "./pages/user/edit";
import Categories from "./pages/categories";
import AddCategory from "./pages/category/add";
import EditCategory from "./pages/category/edit";
import Questions from "./pages/questions";
import AddQuestion from "./pages/questions/add";
import EditQuestion from "./pages/questions/edit";
import Battles from "./pages/battles";
import AddBattle from "./pages/battles/add";
import EditBattle from "./pages/battles/edit";
import ShopItems from "./pages/shopItems";
import AddShop from "./pages/shop/add";
import EditShop from "./pages/shop/edit";

const isAuthenticated = () => {
  return store.getState().auth.isAuthenticated && localStorage.getItem("token");
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const NoMatch = () =>
  store.getState().auth.isAuthenticated && localStorage.getItem("token") ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true
    };
  }

  componentDidMount() {
    let currentRoute = history.location.pathname;
    this.setState({
      disable: currentRoute === "/login" || currentRoute === "/forgetpassword"
    });
    this.changeTitle(currentRoute);
    history.listen(location => {
      let currentRoute = location.pathname;
      this.changeTitle(currentRoute);
      this.setState({
        disable: currentRoute === "/login" || currentRoute === "/forgetpassword"
      });
      window.scrollTo(0, 0);
    });
  }

  changeTitle = path => {
    switch (path) {
      case "/":
        return (document.title = "Dashboard");
      case "/login":
        return (document.title = "Login");
      case "/register":
        return (document.title = "Register");
      case "/users":
        return (document.title = "Users list");
      case "/users/add":
        return (document.title = "New user");
      case "/categories":
        return (document.title = "Categories");
      case "/category/add":
        return (document.title = "New category");
      case "/questions":
        return (document.title = "Questions");
      case "/question/add":
        return (document.title = "New question");
      case "/shop":
        return (document.title = "Shop Items");
      case "/shop/add":
        return (document.title = "New shop item");
      default:
        return this.handleRouteWithParams(path);
    }
  };

  handleRouteWithParams = path => {};

  render() {
    let { disable } = this.state;
    return (
      <Provider store={store}>
        <Router history={history}>
          <main className={`dashboard ${disable ? "no-access" : ""}`}>
            {!disable && <MainView history={history} />}
            <Switch>
              {/* Dashboard */}
              <Route exact path="/" component={Dashboard} />
              {/* User */}
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/add" component={AddUsers} />
              <Route path="/user/edit/:id" component={EditUser} />
              {/* Categories */}
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/category/add" component={AddCategory} />
              <Route path="/category/edit/:id" component={EditCategory} />
              {/* Questions */}
              <Route exact path="/questions" component={Questions} />
              <Route exact path="/question/add" component={AddQuestion} />
              <Route path="/question/edit/:id" component={EditQuestion} />
              {/* Battles */}
              <Route exact path="/battles" component={Battles} />
              <Route exact path="/battle/add" component={AddBattle} />
              <Route path="/battle/edit/:id" component={EditBattle} />
              {/* Shop Items */}
              <Route exact path="/shop" component={ShopItems} />
              <Route exact path="/shop/add" component={AddShop} />
              <Route path="/shop/edit/:id" component={EditShop} />
              {/* Authentication */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgetpassword" component={Forgot} />
              {/* 404 */}
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}
