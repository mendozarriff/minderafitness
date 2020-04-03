import React from 'react';
import Navbar from './Navbar';
import {Link,useRouteMatch, withRouter} from "react-router-dom";

class TodaysWorkout extends React.Component{
  constructor(props){
    super(props)

    this.links = this.links.bind(this)
  }
  links(){
  
    return (
      <ul>
        <li><Link to="/workout">Edit Workout</Link></li>
        <li><button type="button">View Calendar</button></li>
      </ul>
    )
  }
  render(){
    return (
      <div>
      <Navbar links={this.links}/>
        TodaysWorkout
      </div>
    )
  }
  
}

export default TodaysWorkout;