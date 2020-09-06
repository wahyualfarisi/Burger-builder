import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';



class App extends React.Component {
 

  render(){
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout"  component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </Layout>
      </div>
    );

  }
}

export default App;
