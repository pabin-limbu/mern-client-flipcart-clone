import "./App.css";
import HomePage from "./containers/HomePage";
import ProductListpage from "./containers/ProductListPage";
import {
  BrowserRouter as Router,
  Route,
  StaticRouter,
  Switch,
} from "react-router-dom";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCartItems, isUserLogedIn } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import { updateCart } from "../src/actions";
import CheckoutPage from "../src/containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      //every time a page is refreshed the page loose its state and to keep track of the state we have to check if user is loged in using token stored in local storage. which will then et the state value.
      dispatch(isUserLogedIn());
    }
  }, [auth.authenticate]);

  //since redux data is lost when page refresh to prevent loss of data we save the cart item in local storage as well.
  // so whenever the page is reloaded the localstorage data should be stored back to the redux store.
  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          ></Route>
          <Route path="/:slug" component={ProductListpage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
