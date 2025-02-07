import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./pages/ProtectedRoute";

import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Profile from "./pages/Profile";
import Basket from "./pages/Basket";
import Admin from "./pages/Admin";
import Error404 from "./pages/Error404";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Product from "./pages/Products";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <div id="content">
          <Switch>
            <Route path="/" exact component={Product} />
            {/* <Route path="/product/:product_id" component={ProductDetail} /> */}
            <Route path="/login" component={Signin} />
            <Route path="/register" component={Signup} />

            {/* <Route path="/signin" component={SignIn} /> */}
            {/* <Route path="/signup" component={Signup} /> */}
            {/* <Route path="/basket" component={Basket} />
						<ProtectedRoute path="/profile" component={Profile} />
						<ProtectedRoute path="/admin" component={Admin} admin={true} />
						<Route path="*" component={Error404} /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
