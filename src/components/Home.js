import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import {Link,useRouteMatch} from "react-router-dom";
import workouts from '../api/workouts';
import _ from 'lodash';


class Home extends React.Component{
  
  constructor(props){
    super(props)
    const checkedWorkouts = sessionStorage.getItem('checkedWorkouts') ? JSON.parse(sessionStorage.getItem('checkedWorkouts')): undefined;
    const selectedWorkouts = sessionStorage.getItem('selectedWorkouts') ?  JSON.parse(sessionStorage.getItem('selectedWorkouts')) : undefined;
  
    this.state = {
      filter : 'all',
      workoutsSelected : selectedWorkouts ? selectedWorkouts : [],
      checkedItems: [],
      checked: checkedWorkouts ? checkedWorkouts : {}
    }

    this.links = this.links.bind(this);
    this.switchWorkout = this.switchWorkout.bind(this);
    this.selectWorkout = this.selectWorkout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearWorkouts = this.clearWorkouts.bind(this);
  }

  switchWorkout(e){
    this.setState({filter:e.target.dataset.workout})
  }

  selectWorkout(e){
    if(e.target.checked){
      this.setState(
        {workoutsSelected:this.state.workoutsSelected.concat(e.target.value)}
      );
      
    }else{
      const workouts = this.state.workoutsSelected.filter(workout => workout !== e.target.value )
      this.setState({workoutsSelected:workouts})
    }

    // console.log('currently in workoutsSelected state: ', this.state.workoutsSelected)
    // localStorage.setItem('selectedWorkouts',JSON.stringify(this.state.workoutsSelected))
    
    
  }

  handleChange(e){
    if(e.target.checked){
      this.setState({
        checked:{...this.state.checked, [e.target.name] : e.target.value}
      })
    }else{
      this.setState({
        checked:_.omit(this.state.checked, [e.target.name])
      })
    }
    
  }

  componentDidMount(){
    // const selectedWorkouts = JSON.parse(sessionStorage.getItem('selectedworkouts'));
    // this.setState({checked: selectedWorkouts})
    // console.log(typeof selectedWorkouts)
  }

  clearWorkouts(){
    this.setState({
      workoutsSelected:[],
      checked: {}
    });

    sessionStorage.setItem('checkedWorkouts','')
    sessionStorage.setItem('selectedWorkouts','')
  }

  handleSubmit(e){
    
    e.preventDefault();


    if(this.state.workoutsSelected.length > 0){
      sessionStorage.setItem('checkedWorkouts',JSON.stringify(this.state.checked))
      sessionStorage.setItem('selectedWorkouts',JSON.stringify(this.state.workoutsSelected))
      window.location.href = "/workout";
    }else{
      alert('you have not selected any workouts')
    }
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
          <button onClick={this.clearWorkouts}>Clear All</button>
        </div>
 
        <div className="main_body_container">
        <form className="main_body" onSubmit={this.handleSubmit}>
        <div className="list"> 
          {/* workouts are filtered when filter state changes.  the state is set in the switchWorkout function */}
          {allWorkouts.map((workout, index) => workout.type == this.state.filter ? 
            <Container key={index}> 
              <div className="list_item">
                <p className="list_item_title">{workout.name}</p>
                <div className="list_item_description_container">
                <p className="list_item_description">
                {workout.description}
                
                </p>
                <a href="#">Learn More</a>
                </div>
                
                <div className="list_item_image">

                </div>
                <input  onClick={this.selectWorkout} 
                        name={`${workout.id}_${workout.type}`} 
                        onChange={this.handleChange} 
                        checked={this.state.checked[`${workout.id}_${workout.type}`] === workout.name}  
                        type="checkbox" 
                        value={workout.name}/>
              </div>
          </Container> : "" )}
        {/* all workouts are displayed by default */}
        {this.state.filter == 'all'? allWorkouts.map((workout,index) => 
          <Container key={index}> 
            <div className="list_item">
              <p className="list_item_title">{workout.name}</p>
              <div className="list_item_description_container">
              <p className="list_item_description">
              {workout.description}
              </p>
              <a href="#">Learn More</a>
              </div>
              <div className="list_item_image">

              </div>
              <input  onClick={this.selectWorkout} 
                      name={`${workout.id}_${workout.type}`}  
                      onChange={this.handleChange} 
                      checked={this.state.checked[`${workout.id}_${workout.type}`] === workout.name} 
                      type="checkbox" 
                      value={workout.name}/>
            </div>
          </Container>) : ""}     
          </div>
          <div className="workout">
            <Container>
              <h2>Your Workout</h2>
              <ul>
              {this.state.workoutsSelected.length > 0 ? this.state.workoutsSelected.map(function(workout,index){
                return <li key={index}>{workout}</li>
              })  : <li>You have not selected any workout</li> }
              {/* {this.state.checkedItems ? console.log(this.state.checkedItems) : <li>You have not selected any workout</li> } */}
             
              </ul>
            </Container>
            
            <button>Start Workout</button>
            {/* <button>C</button> */}
            {/* <Link to="/workout">Start</Link> */}
          </div>
        </form>
          
          
        </div>
      </div>
      </div>
    )
  }
}

export default Home;