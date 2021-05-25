import { useEffect , useState } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import MenuHeader from './components/layout/MenuHeader'
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

// Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'

// Order Imports
import ListOrders from './components/order/ListOrders'

//  Auth or User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";

// Admin Imports

import Dashboard from "./components/admin/Dashboard" ;

import ProtectedRoute from "./components/route/ProtectedRoute";
import axios from 'axios'
import { loadUser } from "./actions/userActions";
import store from "./store";

//Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


//import './App.css'
function App() {

  const [stripeApiKey , setStripeApiKey] = useState('');


  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      console.log(data.stripeApiKey);
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <MenuHeader />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping}  />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder}  />
          <ProtectedRoute path="/success" component={OrderSuccess}  />


          {stripeApiKey && 
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path='/payment' component={Payment} />
          </Elements>
          }

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
          <ProtectedRoute path="/orders/me" component={ ListOrders } exact />


        </div>
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />


        <Footer />
      </div>
    </Router>
  );
}

export default App;
