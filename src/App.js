import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Workout from './components/Workout';
import logo from './components/images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  
  return (
    <Router>
    <div className="App">
      <Header logo={logo}/>
      <Switch>
      <Route path='/workout'>
        <Workout />
      </Route>
      <Route path='/'>
      <Home />
      </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
