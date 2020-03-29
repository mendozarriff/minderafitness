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

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      filterBg:''
    }
  }

  addFilterBg = (value) => {
    this.setState({
      filterBg: value
    })
  }
render(){

  return (
    <Router>
    <div className="App">
      <Header addFilterBg={this.state.filterBg} logo={logo}/>
      <Switch>
      <Route path='/workout'>
        <Workout />
      </Route>
      <Route path='/'>
      <Home addFilterBg={this.addFilterBg} />
      </Route>
      </Switch>
      <Footer addFilterBg={this.state.filterBg}/>
    </div>
    </Router>
  );
}
  
  
}

export default App;
