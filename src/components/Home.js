import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import {Link,useRouteMatch, withRouter} from "react-router-dom";
import workouts from '../api/workouts';
import checkmark from './images/selected.png';
import upperbody from './images/upperbody_logo.png';
import lowerbody from './images/lower_body_logo.png'
import fullbody from './images/fullbody_logo.png'
import down_arrow from './images/down.png';
import _ from 'lodash';
import * as Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';


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
      buttonStatus: { background: 'grey', color: '#f2f2f2'},
      scrollToDiv: 0,
      mobileWorkoutList: false,
      filterBg:"",
      faAngle : faAngleUp
      
    }

    this.links = this.links.bind(this);
    this.switchWorkout = this.switchWorkout.bind(this);
    this.selectWorkout = this.selectWorkout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearWorkouts = this.clearWorkouts.bind(this);
    this.myRef = React.createRef() 
    this.scroll = Scroll.animateScroll;
    this.displayWorkouts = this.displayWorkouts.bind(this)
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
      
      setTimeout(
        function() {
          this.props.history.push("/workout");
          this.props.addFilterBg("");
        }
        .bind(this),
        500
    );
      
    }else{
      alert('you have not selected any workouts')
    }
  }

  displayWorkouts(){
    this.setState({
      mobileWorkoutList: !this.state.mobileWorkoutList,
      filterBg:this.state.filterBg === "" ? 'blur(10px)' : "",
      faAngle : this.state.faAngle ===  faAngleUp ? faAngleDown : faAngleUp 
    })
    this.props.addFilterBg(this.state.filterBg === "" ? 'blur(10px)' : "")
  }

  links(){
    return (
      <React.Fragment>
        <li className={this.state.filter === "upper body" ? "bodyfocus_link change_bg" : "bodyfocus_link" }><img data-workout='upper body' onClick={this.switchWorkout} className="upperbody_img" src={upperbody} alt=""/></li>
        <li className={this.state.filter === "lower body" ? "bodyfocus_link change_bg" : "bodyfocus_link" } ><img data-workout='lower body' onClick={this.switchWorkout} className="lowerbody_img" src={lowerbody} alt=""/></li>
        <li className="bodyfocus_link"><img className="fullbody_img" src={fullbody} alt=""/></li>
        <li className={this.state.filter === "all" ? "bodyfocus_link all change_bg" : "bodyfocus_link all" } data-workout='all' onClick={this.switchWorkout}>ALL</li>
      </React.Fragment>

     
    )
  }

  render(){
  
    const title = "choose body part";
    const allWorkouts = workouts.all;
    return(
      <div>
      <Navbar filterBg={this.state.filterBg}  title={title} links={this.links} /> 
      <div className="main">
        <div className="main_title" style={{filter:this.state.filterBg}}>
          <h2>Choose Exercise</h2>
          <div>
          
          <button onClick={this.clearWorkouts}>Clear All</button>
          </div>
          
        </div>
 
        <div className="main_body_container">
        
        <p className="text-center text-uppercase filter_text" style={{filter: this.state.filterBg}}>{this.state.filter}</p>
       
        <form className="main_body" onSubmit={this.handleSubmit}>
        <div className="list_container" style={{filter:this.state.filterBg}}>

        <div className="list" ref={this.myRef}> 
          {/* workouts are filtered when filter state changes.  the state is set in the switchWorkout function */}
          {allWorkouts.map((workout, index) => workout.type == this.state.filter ? 
            <Container key={index}> 
              <div className="list_item" id={`${index}_list`}>
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
            <div className="list_item" id={`${index}_list`}>
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
                <input onClick={this.selectWorkout} 
                      name={`${workout.id}_${workout.type}`}  
                      onChange={this.handleChange} 
                      checked={this.state.checked[`${workout.id}_${workout.type}`] === workout.name} 
                      type="checkbox" 
                      value={workout.name}/>
              </label>
            </div>
          </Container>) : ""}     
          </div>

          </div>
            {this.state.workoutsSelected.length > 0 ? <div className={this.state.mobileWorkoutList ? "num_of_items_checked pull_up" : "num_of_items_checked"}>
            <div onClick={this.displayWorkouts} >
              <FontAwesomeIcon className="angle_arrow" size="2x" icon={this.state.faAngle} />
              
            </div>
            
            <p className="workout_counter">
           
              {this.state.workoutsSelected.length}
            
            </p>
              
              
            <div class="mobile_picked_list">
              <Container>
                <h2>YOUR WORKOUT</h2>
                <ul>
                {this.state.workoutsSelected.length > 0 ? this.state.workoutsSelected.map(function(workout,index){
                  return <li style={{textTransform:"capitalize"}} key={index}>{workout}</li>
                })  : <p style={{textAlign:"center"}}>You have not selected any workout</p> }

              
                </ul>
                <button className="ripple">Start Workout</button>
              </Container>
              
              
            </div>
            </div> : ""}
            <div className="workout">
              <Container>
                <h2>Your Workout</h2>
                <ul>
                {this.state.workoutsSelected.length > 0 ? this.state.workoutsSelected.map(function(workout,index){
                  return <li style={{textTransform:"capitalize"}} key={index}>{workout}</li>
                })  : <p style={{textAlign:"center"}}>You have not selected any workout</p> }

              
                </ul>
              </Container>
              
              <button>Start Workout</button>
            </div>
          {/* </div> */}
        </form>
        </div>
      </div>
      </div>
    )
  }
}

// export default Home;
export default withRouter(Home)
