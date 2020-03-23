import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import {Link,useRouteMatch} from "react-router-dom";
import workouts from '../api/workouts';


class Home extends React.Component{
  
  constructor(props){
    super(props)

    this.state = {
      filter : 'all'
    }

    this.links = this.links.bind(this);
    this.switchWorkout = this.switchWorkout.bind(this);
  }

  switchWorkout(e){
    this.setState({filter:e.target.dataset.workout})
  }

  links(){
    return (
      <ul>
        <li data-workout='upper body' onClick={this.switchWorkout}>upper-body</li>
        <li data-workout='lower body' onClick={this.switchWorkout}>lower-body</li>
        <li>full-body</li>
        <li data-workout='all' onClick={this.switchWorkout}>all</li>
      </ul>
    )
  }

  render(){

    const title = "choose body part";
    const allWorkouts = workouts.all;
    return(
      <div>
      <Navbar title={title} links={this.links} /> 
      <div className="main">
        <div className="main_title">
          <h2>Choose Exercise</h2>
        </div>
        <div className="main_body">
            <div className="list"> 
            {/* workouts are filtered when filter state changes.  the state is set in the switchWorkout function */}
    {allWorkouts.map(workout => workout.type == this.state.filter ? <Container> 
        <div className="list_item">
          <p className="list_item_title">{workout.name}</p>
          <p className="list_item_description">
          {workout.description}
          <a href="#">Learn More</a>
          </p>
          <div className="list_item_image">

          </div>
          <input type="checkbox"/>
        </div>
    </Container> : "" )}
{/* all workouts are displayed by default */}
{this.state.filter == 'all'? allWorkouts.map(workout => <Container> 
        <div className="list_item">
          <p className="list_item_title">{workout.name}</p>
          <p className="list_item_description">
          {workout.description}
          <a href="#">Learn More</a>
          </p>
          <div className="list_item_image">

          </div>
          <input type="checkbox"/>
        </div>
    </Container>) : ""}     
            </div>
            <div className="workout">
              <Container>
                <h2>Your Workout</h2>
                <ul>
                  <li>Pull up</li>
                  <li>Bent Over Row</li>
                  <li>Dumbbell Shrug</li>
                  <li>Dips</li>
                  <li>Incline</li>
                  <li>Dumbbell Press</li>
                </ul>
                {/* <Button>START</Button> */}
                <Link to='/workout'>START</Link>
              </Container>
            </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Home;