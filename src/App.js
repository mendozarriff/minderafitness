import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import TodaysWorkout from './components/TodaysWorkout';
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
      filterBg:'',
      modalWorkoutName: '',
      modalWorkoutDescription: '',
      modalWorkoutGif: '',
      workoutModalOverlay:'',
      workoutModal: ''
    }
  }

  addFilterBg = (value) => {
    this.setState({
      filterBg: value
    })
  }

  openModal = (name, description, gif)=>{
    this.setState({
      modalWorkoutName: name,
      modalWorkoutDescription: description,
      modalWorkoutGif: gif,
      workoutModalOverlay: 'display',
      workoutModal : 'display'
    })
  }

  closeModal =() =>{
    this.setState({
      modalWorkoutName: '',
      modalWorkoutDescription: '',
      modalWorkoutGif: '',
      workoutModalOverlay:'',
      workoutModal: ''
    })
  }
render(){

  return (
    <Router>
    <div className="App">
      <Header addFilterBg={this.state.filterBg} logo={logo}/>
      <Switch>
      
      <Route path='/workout'>
        <Workout 
          openModal={this.openModal} 
          closeModal={this.closeModal}
          modalWorkoutName={this.state.modalWorkoutName}
          modalWorkoutDescription ={this.state.modalWorkoutDescription}
          modalWorkoutGif={this.state.modalWorkoutGif}
          workoutModalOverlay={this.state.workoutModalOverlay}
          workoutModal={this.state.workoutModal}
        />
      </Route>
      <Route path="/todays-workout">
        <TodaysWorkout />
      </Route>
      <Route path='/'>
      <Home 
        addFilterBg={this.addFilterBg} 
        openModal={this.openModal} 
        closeModal={this.closeModal}
        modalWorkoutName={this.state.modalWorkoutName}
        modalWorkoutDescription ={this.state.modalWorkoutDescription}
        modalWorkoutGif={this.state.modalWorkoutGif}
        workoutModalOverlay={this.state.workoutModalOverlay}
        workoutModal={this.state.workoutModal}
        />
      </Route>
      </Switch>
      <Footer addFilterBg={this.state.filterBg}/>
    </div>
    </Router>
  );
}
  
  
}

export default App;
