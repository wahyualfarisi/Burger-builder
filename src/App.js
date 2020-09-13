import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const AsyncCheckout = React.lazy( () => {
  return import('./containers/Checkout/Checkout');
});

const AsyncOrders = React.lazy( () => {
  return import('./containers/Orders/Orders');
});

const App = props => {
 
  useEffect( () => {
    props.onTryAutoSignUp();

  }, [])
  
  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />

        <Route path="/checkout"  render={ () => (
          <Suspense fallback={<Spinner />}>
            <AsyncCheckout {...props} />
          </Suspense>
        )} />

        <Route path="/orders" render={ () => (
          <Suspense fallback={<Spinner />}> 
            <AsyncOrders /> 
          </Suspense>
        ) } />
        
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
        <Layout>
          {routes}
        </Layout>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch( actions.authCheckState() )
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) ) ;
