import React from 'react';
import Navbar from './Navbar';
import WorkoutInfoModal from './WorkoutInfoModal'
import { Link, withRouter } from "react-router-dom";
import workouts from '../api/workouts';
import { Container, Button } from 'react-bootstrap';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {Spring, Transition} from 'react-spring/renderprops';
import ReactTimeout from 'react-timeout'
// import {Link,useRouteMatch} from "react-router-dom";

class Workout extends React.Component{

constructor(props){
  super(props)
  // gets the values from session storage picked on Home component if it exists and sets them to state, if it doesn't then the value is an empty object 
  const checkedWorkouts = sessionStorage.getItem('checkedWorkouts') ? JSON.parse(sessionStorage.getItem('checkedWorkouts')) : {};
  const workoutKeys = checkedWorkouts ? Object.keys(checkedWorkouts) : {};

  this.state = {
    checkedWorkouts,
    workoutKeys,
    workoutsPicked: [],
    remove:'',
    setsModal: '',
    workoutName : '',
    workoutID: '',
    workoutSelectedID:{},
    reps: 0,
    sets: 0,
    weight: 0,
    weights: {},
    allReps: {},
    allSets: {},
    allWorkouts: [],
    displayOverlay: '',
    tooltip: '',
    allTooltips: {}

  }

  this.clearWorkouts = this.clearWorkouts.bind(this);
  this.links = this.links.bind(this);
  this.displayWorkouts = this.displayWorkouts.bind(this);
  // this.openSetsModal = this.openSetsModal.bind(this);
  this.closeSetsModal = this.closeSetsModal.bind(this);
  this.decrease = this.decrease.bind(this);
  this.increase = this.increase.bind(this);
  this.handleChange = this.handleChange.bind(this)
  this.handleBlur = this.handleBlur.bind(this);
  this.handleWorkoutSubmit = this.handleWorkoutSubmit.bind(this)
  this.handleWorkoutsSubmit = this.handleWorkoutsSubmit.bind(this);
}

openSetsModal(workoutName, workoutID){

  const name = workoutID+"_"+workoutName;

  this.setState({
    setsModal: 'display',
    workoutName: workoutName,
    workoutID,
    displayOverlay: 'display',
    weight: this.state.weights[name] ? this.state.weights[name] : 0,
    sets: this.state.allSets[name] ? this.state.allSets[name] : 0,
    reps: this.state.allReps[name] ? this.state.allReps[name] : 0,
    
  })
}

closeSetsModal(){
  this.setState({
    setsModal: '',
    workoutName: '',
    workoutID: '',
    displayOverlay: ''
  })
}

handleChange(e){
  const {name} = e.target;
  const value = e.target.value;

  this.setState({
    [name]:[value]
  })
}

handleBlur(e){
  const {name} = e.target;
  if(isNaN(this.state[name])){
    this.setState({
      [name]: 0
    });
  }else{
    this.setState({
      [name]: Math.abs(this.state[name]),
      tooltip: ''
    });
  }
}

decrease(num){
  // console.log('test')
  this.setState({
    [num]: parseInt(this.state[num]) <= 0  ? Math.abs(this.state[num]) : parseInt(this.state[num]) - 1
  })
}

increase(num){
  this.setState({
    [num]: parseInt(this.state[num]) + 1 
  })
}

handleWorkoutSubmit(e){
  e.preventDefault();
  const id = this.state.workoutID;
  const name = this.state.workoutName;
  const selected = id+"_"+name;
  const filteredWorkouts = this.state.allWorkouts.filter(workout => workout.id !== id);
  this.props.setTimeout(()=>
  this.setState({
    allWorkouts: [...filteredWorkouts,{
      name,
      id,
      reps: this.state.reps,
      sets: this.state.sets,
      weight: this.state.weight,
    }],
    displayOverlay: '',
    setsModal: '',
    weights : {
      ...this.state.weights,
      [selected]: this.state.weight
    },
    allSets : {
      ...this.state.allSets,
      [selected]: this.state.sets
    },
    allReps : {
      ...this.state.allReps,
      [selected]: this.state.reps
    },
    workoutSelectedID:{
      ...this.state.workoutSelectedID,
      [selected]:id
    },

    allTooltips:{
      ...this.state.allTooltips,
      [selected]: this.state.tooltip
    }
    // tooltip: this.state.allTooltips[selected] ? this.state.allTooltips[selected] : '',
    
    
   
}),600) 
}

handleWorkoutsSubmit(e){
  e.preventDefault();

  const allworkouts = Object.keys(this.state.checkedWorkouts);
  const editedWorkouts = this.state.allWorkouts

  if(allworkouts.length < 1){
    alert('there are no exercises on this workout')
  }else if(allworkouts.length !== editedWorkouts.length){


    this.setState({
      tooltip: 'display'
    });


    this.props.setTimeout((()=>
    this.setState({
      tooltip: ''
    })

    ),4000);
    
  }else{
    this.props.history.push("/todays-workout");
  }

}

componentDidMount(){
  const workoutIDS = [];
  const workoutKeys = this.state.workoutKeys;
  const workoutsPicked = [];

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

    console.log('workoutsPicked',workoutsPicked)
    // sets the state workoutsPicked to be displayed on render() 
    this.setState({
      workoutsPicked
    });
}


clearWorkouts(){
  this.setState({workoutsPicked:[]})
  this.setState({
    checkedWorkouts:{}
  })
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
  const removeWorkout = this.state.allWorkouts.filter(workout => workout.id !== id);
  // const allWorkouts = this.state.allWorkouts ? this.state.allWorkouts.filter(workout => workout.id !== id) : [];
  //gets just the names of the list filtered
  const workoutList = removeWorkoutList.map( workout => workout.name);
  

  //gets the updated checked inputs to be set in sessionStorage and state
  const filteredCheckedWorkouts = _.omit(checkedWorkouts, key)

  this.setState({
    checkedWorkouts: filteredCheckedWorkouts,
    workoutsPicked:removeWorkoutList,
    allWorkouts:removeWorkout
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


displayWorkouts(){

  const workoutsPicked = this.state.workoutsPicked;

  return workoutsPicked.length > 0 ? <Transition
  items={workoutsPicked} keys={(workout) => workout.id}
  from={{ transform: 'translate3d(0,-100vh,0)' }}
  enter={{ transform: 'translate3d(0,0,0)' }}
  leave={{ transform: 'translate3d(0,-100vh,0)' }}
  trail={100}
  config={{ duration: 200 }}
  >

  {
    workout => props => <Container className={`workout_tab ${this.state.workoutSelectedID[`${workout.id}_${workout.name}`] === workout.id ? 'selected' : ''}`}style={props}>
              
    <div className={`list_item ${this.state.remove}`}>
      <div className="list_item_title_container">
        <p className="list_item_title">{workout.name}</p>
      </div>
      <div className="list_item_description_container adjust_width">
        <p className="list_item_description">{workout.description}</p>
        <a onClick={this.props.openModal.bind(this,workout.name, workout.description, workout.gif )}>Learn<br />More</a>
  
      </div>
      <div className="tooltip-container">
        <div className={`tooltip-text ${this.state.workoutSelectedID[`${workout.id}_${workout.name}`] === workout.id ? '' : this.state.tooltip }`}>Press Here</div>
        <p onClick={this.openSetsModal.bind(this, workout.name, workout.id)}>Sets / Reps</p>
       
      </div>
      <div>
        <button type='button' onClick={this.removeWorkout.bind(this, workout.id, workout.type)}><FontAwesomeIcon style={{ color: "#ff4c4c"}} size="2x" icon={faTrashAlt} /></button>
      </div>
    </div>
    </Container> 

    }
</Transition> : <p>No Workouts for today.</p>

}
render(){
  const title = "upper body work";
  // console.log('this.state.allTooltips: ',this.state.allTooltips)
  // console.log('this.state.workoutSelectedID: ',this.state.workoutSelectedID)
  // console.log('this.state.weights:', this.state.weights)
  // const index = 0; 
  // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  return (
  
    <React.Fragment>
    <div className={`workout_modal_overlay ${this.props.workoutModalOverlay} ${this.state.displayOverlay}`}></div>
    <form onSubmit={this.handleWorkoutSubmit}>
    <div className={`sets_modal ${this.state.setsModal}`}>
      <div className="sets_modal_header">
        <p className="sets_modal_header_name">{this.state.workoutName}</p>
        <p className="close_button" onClick={this.closeSetsModal}>X</p>
      </div>
      
      <div className="set_modal_body_container">
        <div className="set_modal_body">
          <div className="set_modal_body_inputs">
            <label htmlFor="weight">Weight:</label>
              <input id="weight" type="text" name="weight" onBlur={this.handleBlur}  onChange={this.handleChange} 
              value={this.state.weight}/> 
            <div className="set_modal_body_btns">
              <span onClick={this.decrease.bind(this,'weight')}>-</span>
              <span onClick={this.increase.bind(this,'weight')}>+</span>
            </div>
          </div>
          <div className="set_modal_body_inputs">
            <label htmlFor="sets">Sets: </label>
            <input id="sets" type="text" name="sets" onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.sets}/>
            <div className="set_modal_body_btns">
              <span onClick={this.decrease.bind(this,'sets')}>-</span>
              <span onClick={this.increase.bind(this,'sets')}>+</span>
            </div>
          </div>
          <div className="set_modal_body_inputs">
            <label htmlFor="reps">Reps:</label>
              <input id="reps" type="text" name="reps" onBlur={this.handleBlur}  onChange={this.handleChange} value={this.state.reps}/>
            <div className="set_modal_body_btns">
              <span onClick={this.decrease.bind(this,'reps')}>-</span>
              <span onClick={this.increase.bind(this,'reps')}>+</span>
            </div>
          </div>
        </div>
        <div className="set_modal_footer">
          <p>Weight: <span className="font-weight-bold">{this.state.weight}</span></p>
          <p>Sets: <span className="font-weight-bold">{this.state.sets}</span></p>
          <p>Reps: <span className="font-weight-bold">{this.state.reps}</span></p>
        </div>
        <div className="set_modal_submit">
          <button className="ripple blk">Submit</button>
        </div>
      </div>
    </div>
    </form>
      <Navbar title={title} links={this.links} />
      <div className="main_body_container">
        <div className="main_body">
        <div className="list_container" style={{filter:this.state.filterBg}}>
        <form onSubmit={this.handleWorkoutsSubmit}>
          <div className="list">
          <WorkoutInfoModal 
          modalWorkoutName={this.props.modalWorkoutName} 
          modalWorkoutDescription={this.props.modalWorkoutDescription}
          modalWorkoutGif={this.props.modalWorkoutGif}
          workoutModalOverlay={this.props.workoutModalOverlay}
          workoutModal={this.props.workoutModal}
          closeModal={this.props.closeModal}
           />
          {this.displayWorkouts()}
            
          </div> 
          <div className="text-center">
            <button className='btn-two ripple blk'>View Workout</button>
          </div>
          </form>
          </div>
        </div>
      </div>
      </React.Fragment>
  )
}
  

}

export default withRouter(ReactTimeout(Workout));