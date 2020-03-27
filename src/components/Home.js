import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import {Link,useRouteMatch, withRouter} from "react-router-dom";
import workouts from '../api/workouts';
import checkmark from './images/selected.png';
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
      checked: checkedWorkouts ? checkedWorkouts : {},
      pickedButton: "Pick Workout",
      buttonStatus: { background: 'grey', color: '#f2f2f2'}
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
  }

  handleChange(e){
    if(e.target.checked){
      this.setState({
        checked:{...this.state.checked, [e.target.name] : e.target.value},
        buttonStatus: {background: "#00cc00", color:"#003300"}
      })
    }else{
      this.setState({
        checked:_.omit(this.state.checked, [e.target.name])
      })
    }
    
  }

  clearWorkouts(){
    this.setState({
      workoutsSelected:[],
      checked: {}
    });

    sessionStorage.removeItem('checkedWorkouts','')
    sessionStorage.removeItem('selectedWorkouts','')
  }

  handleSubmit(e){
    
    e.preventDefault();


    if(this.state.workoutsSelected.length > 0){
      sessionStorage.setItem('checkedWorkouts',JSON.stringify(this.state.checked))
      sessionStorage.setItem('selectedWorkouts',JSON.stringify(this.state.workoutsSelected))
      this.props.history.push("/workout");
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
    console.log('checked: ',this.state.checked);
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
                <label className={this.state.checked[`${workout.id}_${workout.type}`] === workout.name ? "workout_button selected_workout" : "workout_button unselected_workout"}>
                {this.state.checked[`${workout.id}_${workout.type}`] === workout.name? <img className="checkmark_img" src={checkmark} alt="" />  : <p>PICK WORKOUT</p>}
                  <input  onClick={this.selectWorkout} 
                        name={`${workout.id}_${workout.type}`} 
                        onChange={this.handleChange} 
                        checked={this.state.checked[`${workout.id}_${workout.type}`] === workout.name}  
                        type="checkbox" 
                        value={workout.name}/>
                </label>
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
              <label className={this.state.checked[`${workout.id}_${workout.type}`] === workout.name ? "workout_button selected_workout" : "workout_button unselected_workout"} > 
              {/* Pick<br />Workout */}
              {this.state.checked[`${workout.id}_${workout.type}`] === workout.name? <img className="checkmark_img" src={checkmark} alt="" /> : <p>PICK WORKOUT</p>}
                <input  onClick={this.selectWorkout} 
                      name={`${workout.id}_${workout.type}`}  
                      onChange={this.handleChange} 
                      checked={this.state.checked[`${workout.id}_${workout.type}`] === workout.name} 
                      type="checkbox" 
                      value={workout.name}/>
              </label>
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

             
              </ul>
            </Container>
            
            <button>Start Workout</button>
          </div>
        </form>
          
          
        </div>
      </div>
      </div>
    )
  }
}

// export default Home;
export default withRouter(Home)
