import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import logo from './components/images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {

  
  return (
    <div className="App">
      <Header logo={logo}/>
      <Home />
      <Footer />
    </div>
  );
}

export default App;
