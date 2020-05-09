import React , { Component } from 'react';
import { Router , Route , Switch} from 'react-router-dom';
import Login from './containers/Page/Login/Login';
import Layouts from './layouts/layouts';
import history from './history';
import { Provider } from 'mobx-react';
import stores from './stores/index'

import './App.css';
import 'antd/dist/antd.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  render(){
    return (
      <Provider {...stores}>
        <Router history={history}>
          <div className="app">
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/" component={Layouts}></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
