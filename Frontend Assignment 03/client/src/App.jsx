import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Checkout from "./Checkout/Checkout";
import History from "./History/History";
import Shop from "./Shop/Shop";
import Chat from "./Share/Chat/Chat";
import { useState, useEffect } from "react";

function App() {
const user = useSelector((state) => state.Session.idUser);
const [hasLogin, setHasLogin] = useState(localStorage.getItem("id_user"))
useEffect(() => {
	setHasLogin(localStorage.getItem("id_user"))
}, [user])
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />{" "}
          <Route path="/detail/:id" component={Detail} />{" "}
          <Route path="/signin" component={SignIn} />{" "}
          <Route path="/signup" component={SignUp} />{" "}
          <Route path="/shop" component={Shop} />
          {!hasLogin && (
            <>
              {/* <Route exact path="/" component={Home} />{" "}
              <Route path="/detail/:id" component={Detail} />{" "}
              <Route path="/signin" component={SignIn} />{" "}
              <Route path="/shop" component={Shop} /> */}
              <Redirect to="signin" />
            </>
          )}
          <Route path="/cart" component={Cart} />{" "}
          <Route path="/checkout" component={Checkout} />{" "}
          <Route path="/history" component={History} />{" "}
        </Switch>{" "}
      </BrowserRouter>
      {hasLogin && <Chat />}

      <Footer />
    </div>
  );
}

export default App;
