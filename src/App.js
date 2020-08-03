import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends React.Component {

  render(){
    return (
      <div>
          <Layout>
            <BurgerBuilder />
            <h1>Hallo ...</h1>
          </Layout>
      </div>
    );

  }
}

export default App;
