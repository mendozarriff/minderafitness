import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

function Workout(){
const title = "upper body work";
// const links = ['add more', 'remove all'];

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
      <div>
        this is you workout
      </div>
    </div>
    // </Router>
  )

}

export default Workout;