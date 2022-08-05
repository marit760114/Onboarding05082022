//import logo from './logo.svg';
import './App.css';

//import {Home} from './Home';
import {Customer} from './Customer';
import {Product} from './Product';
import {Store} from './Store';
import {Sale} from './Sale';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
        React
      </h3>
      <Navigation/>

     <Switch>
      
     <Route path='/' component={Customer} exact/>
     <Route path='/customer' component={Customer}/>
     <Route path='/product' component={Product}/>
     <Route path='/store' component={Store}/>
     <Route path='/sale' component={Sale}/>
     </Switch>

     
     </div>
     </BrowserRouter>
  );
}

export default App;
