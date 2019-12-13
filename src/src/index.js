import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./home";
import Signup from "./signup";
import Dashboard from "./dashboard";
import Product from "./product";
import Forgot from "./forgot";
import Addproduct from "./addproduct";
import AddColor from "./addColor";
import editproduct from "./editproduct";
import setting from "./setting";
import header from "./header";
import payment from "./payment";
import AddSize from "./addSize";
import orders from "./orders";
import Ordersdetails from "./orderdetails";
import * as serviceWorker from './serviceWorker';


const routing = (
  <Router baseame="/build">
    <Route exact path={"/"} component={Home} />
    <Route path={"/signup"} component={Signup} />
    <Route path={"/dashboard"} component={Dashboard} />
    <Route path={"/dashboard1"} component={payment} />
    <Route path={"/forgot"} component={Forgot} />
    <Route path={"/product"} component={Product} />
    <Route path={"/addsize"} component={AddSize} />
    <Route path={"/addcolor"} component={AddColor} />
    <Route path={"/addproduct"} component={Addproduct} />
    <Route path={"/editproduct/:userId"} component={editproduct} />
    <Route path={"/setting"} component={setting} />
    <Route path={"/header"} component={header} />
    <Route path={"/orders"} component={orders} />
    <Route path={"/ordersdetails/:userId"} component={Ordersdetails} />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
