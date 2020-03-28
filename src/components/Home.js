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
      scrollToDiv: 0
      
    }

    this.links = this.links.bind(this);
    this.switchWorkout = this.switchWorkout.bind(this);
    this.selectWorkout = this.selectWorkout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearWorkouts = this.clearWorkouts.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.myRef = React.createRef() 
    this.scroll = Scroll.animateScroll; 
    this.trackScroll = this.trackScroll.bind(this)
    // this.scrollTo = this.scrollTo.bind(this)
  }

  switchWorkout(e){
    this.setState({filter:e.target.dataset.workout})
  }
  // scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop)   
  


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

  scrollTo(size){
    // console.log(size.length);
    if(this.state.scrollToDiv < size.length - 8){
      this.setState({
          scrollToDiv: this.state.scrollToDiv + 4
        });
    }
    // this.setState({
    //   scrollToDiv: this.state.scrollToDiv + 4
    // });
  }

  trackScroll(){
    console.log('test')
  }

  scrollDown(){
    // const scrollto = this.myRef.current.scrollTop;
    // this.scroll.scrollToTop(this.myRef.current.scrollTop);
    this.myRef.current.scrollTop += 250; 
    this.scroll.scrollMore(500);
  
    // console.log(this.scroll);
    // const topPos = this.myRef.current.offsetTop;
    // console.log(topPos)

    // this.myRef.scrollTop = '43';
    
    // console.log('test');
    // this.scrollToMyRef()
    // this.myRef.current.offsetTop = this.myRef.current.offsetTop + 100
    // console.log(this.myRef.current.offsetTop + 100)
    // window.scrollDown()
    // console.log(this.myRef.current)
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
      <React.Fragment>
        <li className="bodyfocus_link"><img data-workout='upper body' onClick={this.switchWorkout} className="upperbody_img" src={upperbody} alt=""/></li>
        <li className="bodyfocus_link" ><img data-workout='lower body' onClick={this.switchWorkout} className="lowerbody_img" src={lowerbody} alt=""/></li>
        <li className="bodyfocus_link"><img className="fullbody_img" src={fullbody} alt=""/></li>
        <li className="bodyfocus_link all" data-workout='all' onClick={this.switchWorkout}>ALL</li>
      </React.Fragment>

     
    )
  }

  render(){

     /* <React.Fragment>
        <li data-workout='upper body' className="bodyfocus_link" onClick={this.switchWorkout}><img className="upperbody_img" src={upperbody} alt=""/></li>
        <li data-workout='lower body' className="bodyfocus_link" onClick={this.switchWorkout}><img className="lowerbody_img" src={lowerbody} alt=""/></li>
        <li className="bodyfocus_link"><img className="fullbody_img" src={fullbody} alt=""/></li>
        <li className="bodyfocus_link all" data-workout='all' onClick={this.switchWorkout}>ALL</li>
      </React.Fragment> */
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
        <div className="list_container">

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
          {/* <div className="mobile_abso_pos">
            <div className="scroll_down">
              <button type="button" onClick={this.scrollDown}><img src={down_arrow} alt=""/></button>
              
            </div>
          </div> */}
          </div>
          {/* <div className="mobile_fixed_pos"> */}
            {/* <div className="scroll_down">
              <button type="button"><img src={down_arrow} alt=""/></button>
            </div> */}
            {this.state.workoutsSelected.length > 0 ? <div className="num_of_items_checked"><p>Number of workouts picked: {this.state.workoutsSelected.length}</p><p>View Workouts</p></div> : ""}
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
