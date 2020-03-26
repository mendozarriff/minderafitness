import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import workouts from '../api/workouts';
import { Container, Button } from 'react-bootstrap';

function Workout(){
const title = "upper body work";
const checkedWorkouts = JSON.parse(sessionStorage.getItem('checkedWorkouts'));
const workoutKeys = Object.keys(checkedWorkouts);
const workoutIDS = [];
const workoutsPicked = [];


for(var i=0; i<workoutKeys.length; i++){
  workoutIDS.push(workoutKeys[i].split('_').shift())
}

workouts.all.map(function(workout, index) {
  for(var i=0; i<workoutIDS.length; i++){
    if(workout.id == workoutIDS[i]){
      workoutsPicked.push(workout)
    }
  }
})

console.log(workoutsPicked)

const links = () =>{
  
  return (
    <ul>
      <li><Link to="/">Add More</Link></li>
      <li>Remove All</li>
    </ul>
  )
}

  return (
    // <Router>
    <div>
      <Navbar title={title} links={links} />
      <div className="main_body_container">
      <div className="main_body">
      <div className="list">
        {workoutsPicked.map((workout, index) => 
        <Container key={index}>
        <div className="list_item">
          <p className="list_item_title">{workout.name}</p>
          <div className="list_item_description_container">
            <p className="list_item_description">{workout.description}</p>
            <a href="#">Learn More</a>
          </div>
          <div className="list_item_image">

          </div>
        </div>
        </Container>
        )}
      </div> 
      </div>

      </div>
    </div>
    // </Router>
  )

}

export default Workout;