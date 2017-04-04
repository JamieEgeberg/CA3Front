import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import App from "./pages/App";
import BooksPage from "./pages/BooksPage";
import ProductsPage from "./pages/ProductsPage";
import DocumentationPage from "./pages/DocumentationPage";
import UsersPage from "./pages/UsersPage";
import CompanyPage from "./pages/CompanyPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Details from "./pages/Details";
import BookForm from "./pages/BookForm";
import Dashboard from "./pages/Dashboard";
import auth from "./authorization/auth";

function requireAuth(nextState, replace) {
    if (!auth.loggedIn) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="home" component={Home}/>
            <Route path="documentation" component={DocumentationPage}/>
            <Route path="products" component={ProductsPage}/>
            <Route path="products/bookform" component={BookForm}/>
            <Route path="products/bookform/:id" component={BookForm}/>
            <Route path="products/details/:id" component={Details} />
            <Route path="company" component={CompanyPage}/>
            <Route path="books" component={BooksPage}/>
            <Route path="users" component={UsersPage}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
        </Route>
    </Router>
), document.getElementById('root'));