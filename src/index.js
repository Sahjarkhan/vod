import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import Product from "./product";
import Buyer from "./buyer";
import Forgot from "./forgot";
import Addproduct from "./addproduct";
import editproduct from "./editproduct";
import setting from "./setting";
import Category from "./category";
import header from "./header";
import orders from "./orders";
import Ordersdetails from "./orderdetails";
import Addcategory from "./addcategory";
import Editsubcatg from "./editsubcatg";
import Banneruploade from "./banneruploade";
import Bannerlist from "./bannerlist";
import Editbanner from "./editbanner";
import Addtheme from "./addtheme";
import Themelist from "./themelist";
import Addbrand from "./addbrand";
import Brandlist from "./brandlist";
import Sellerlist from "./sellerlist";
import Cuponlist from "./cuponlist";
import Addflashproduct from "./addflashproduct";
import Flashsale from "./flashsale";
import orderrequest from "./orderrequest";
import About from "./about";
import Faqlist from "./faqlist";
import Layout from "./layout";
import Addfaq from "./addfaq";
import AddColor from "./addColor";
import AddSize from "./addSize";
import colorList from "./colorList";
import sizeList from "./sizeList";
import Subsubcategory from "./SubsubcategoryList";
import addSubsubCate from "./addSubsubCate";
import addCupen from "./addCupen";
import cupenList from "./cupenList";
import Editbrand from "./editbrand";
import ViewBuyer from "./BuyerView";

import * as serviceWorker from './serviceWorker';


const routing = (
  <Router baseame="/build">
    <Route exact path={"/"} component={Home} />
    <Route path={"/dashboard"} component={Dashboard} />
    <Route path={"/cupenList"} component={cupenList} />
    <Route path={"/forgot"} component={Forgot} />
    <Route path={"/editbrand/:userId"} component={Editbrand} />
    <Route path={"/product"} component={Product} />
    <Route path={"/addproduct"} component={Addproduct} />
    <Route path={"/editproduct/:userId"} component={editproduct} />
    <Route path={"/setting"} component={setting} />
    <Route path={"/addCupen"} component={addCupen} />
    <Route path={"/header"} component={header} />
    <Route path={"/orders"} component={orders} />
    <Route path={"/addsize"} component={AddSize} />
    <Route path={"/addcolor"} component={AddColor} />
    <Route path={"/ordersdetails/:userId"} component={Ordersdetails} />
    <Route path={"/buyer"} component={Buyer} />
    <Route path={"/category"} component={Category} />
    <Route path={"/addcategory"} component={Addcategory} />
    <Route path={"/editsubcatg/:userId"} component={Editsubcatg} />
    <Route path={"/banneruploade"} component={Banneruploade} />
    <Route path={"/bannerlist"} component={Bannerlist} />
    <Route path={"/addtheme"} component={Addtheme} />
    <Route path={"/subsubcategory"} component={Subsubcategory} />
    <Route path={"/themelist"} component={Themelist} />
    <Route path={"/addbrand"} component={Addbrand} />
    <Route path={"/brandlist"} component={Brandlist} />
    <Route path={"/addflashproduct"} component={Addflashproduct} />
    <Route path={"/flashsale"} component={Flashsale} />
    <Route path={"/sellerlist"} component={Sellerlist} />
    <Route path={"/cupon"} component={Cuponlist} />
    <Route path={"/editbanner/:userId"} component={Editbanner} />
    <Route path={"/about"} component={About} />
    <Route path={"/faqlist"} component={Faqlist} />
    <Route path={"/addfaq"} component={Addfaq} />
    <Route path={"/layout"} component={Layout} />
    <Route path={"/colorList"} component={colorList} />
    <Route path={"/sizeList"} component={sizeList} />
    <Route path={"/viewbuyer/:userId"} component={ViewBuyer} />
    <Route path={"/addSubsubCate"} component={addSubsubCate} />
    <Route path={"/orderrequest"} component={orderrequest} />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
