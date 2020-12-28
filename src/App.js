import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Home from './components/components/SelectUser';
import AddBuilding from './components/components/AddBuilding';
import EditBuilding from './components/components/EditBuilding';
import Building from './components/components/ShowBuilding';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      
    <div className="App">
    <Home />
     <Switch className="col-md-9">
       <Route exact path='/building/add' component={AddBuilding} ></Route>
       <Route exact path='/building/edit/:id' component={EditBuilding} ></Route>
       <Route exact path='/building/:id' component={Building} ></Route>
     </Switch>
      
    </div>
    </Router>
  );
}

export default App;
