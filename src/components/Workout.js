import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import workouts from '../api/workouts';
import { Container, Button } from 'react-bootstrap';
import { render } from '@testing-library/react';
import _ from 'lodash';

class Workout extends React.Component{

constructor(props){
  super(props)
  // gets the values from session storage picked on Home component if it exists and sets them to state, if it doesn't then the value is an empty object 
  const checkedWorkouts = sessionStorage.getItem('checkedWorkouts') ? JSON.parse(sessionStorage.getItem('checkedWorkouts')) : {};
  const workoutKeys = checkedWorkouts ? Object.keys(checkedWorkouts) : {};

  this.state = {
    checkedWorkouts,
    workoutKeys,
    workoutsPicked: []
  }

  this.clearWorkouts = this.clearWorkouts.bind(this);
  this.links = this.links.bind(this);
  // this.clearWorkouts = this.clearWorkouts.bind(this);
}

componentDidMount(){
  const workoutIDS = [];
  const workoutKeys = this.state.workoutKeys;
  const workoutsPicked = []

  //gets all of the workout ids from the wokouts selected
  // value of a workoutKey: 1_upper body
  // retrieves only the number and pushes it in the array workoutIDS  
  if(workoutKeys){
      for(var i=0; i<workoutKeys.length; i++){
        workoutIDS.push(workoutKeys[i].split('_').shift())
      }
  }

  // iterates throught the api workouts.all array of objects
  //  gets only the objects with ids that matches the values from the array workoutIDS
  // saves all of the objects in the array workoutsPicked
  workouts.all.map((workout) => {
      for(var i=0; i<workoutIDS.length; i++){
        if(workout.id == workoutIDS[i]){
          workoutsPicked.push(workout)
        }
      }
    })
    // sets the state workoutsPicked to be displayed on render() 
    this.setState({
      workoutsPicked
    });
}


clearWorkouts(){
  this.setState({workoutsPicked:[]})
  sessionStorage.removeItem('checkedWorkouts');
  sessionStorage.removeItem('selectedWorkouts');
}

removeWorkout(id, type){
  
  //gets all of the checked workouts from state to be filtered
  const checkedWorkouts = this.state.checkedWorkouts;
  // key is a string that is the id and the type of workout: "1_upper body"
  //this is to match the key we want to remove
  const key = id+"_"+type;

  //collects all of the workout list to be displayed and filters it by only returning the workouts with id's that don't match the id's workout to be removed
  const removeWorkoutList = this.state.workoutsPicked.filter(workout => workout.id !== id);
  
  //gets just the names of the list filtered
  const workoutList = removeWorkoutList.map( workout => workout.name);

  //gets the updated checked inputs to be set in sessionStorage and state
  const filteredCheckedWorkouts = _.omit(checkedWorkouts, key)

  this.setState({
    checkedWorkouts: filteredCheckedWorkouts,
    workoutsPicked:removeWorkoutList
  });


  sessionStorage.setItem('selectedWorkouts', JSON.stringify(workoutList));
  sessionStorage.setItem('checkedWorkouts', JSON.stringify(filteredCheckedWorkouts));

}

links(){
  
  return (
    <ul>
      <li><Link to="/">Add More</Link></li>
      <li><button onClick={this.clearWorkouts}>Clear All</button></li>
    </ul>
  )
}
render(){
  const title = "upper body work";
  return (
  
    <div>
      <Navbar title={title} links={this.links} />
      <div className="main_body_container">
        <div className="main_body">
          <div className="list">
            {this.state.workoutsPicked.length > 0 ? this.state.workoutsPicked.map((workout, index) => 
            <Container key={index}>
            <div className="list_item">
              <p className="list_item_title">{workout.name}</p>
              <div className="list_item_description_container">
                <p className="list_item_description">{workout.description}</p>
                <a href="#">Learn More</a>
              </div>
              <div className="list_item_image">

              </div>
              <div>
                <button onClick={this.removeWorkout.bind(this, workout.id, workout.type)}>remove workout</button>
              </div>
            </div>
            </Container>
            ):<p>No Workouts for today</p>}
          </div> 
        </div>
      </div>
    </div>
  )
}
  

}

export default Workout;