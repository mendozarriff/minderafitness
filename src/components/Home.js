import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import {Link} from "react-router-dom";

function Home(){
  const title = "choose body part";
  const links =() => {
    return (
      <ul>
        <li>upper-body</li>
        <li>lower-body</li>
        <li>full-body</li>
        <li>all</li>
      </ul>
    )
  }
    return(
      <div>
      <Navbar title={title} links={links} /> 
      <div className="main">
        <div className="main_title">
          <h2>Choose Exercise</h2>
        </div>
        <div className="main_body">
            <div className="list"> 
            <Container> 
              <div className="list_item">
                <p className="list_item_title">Pull Up</p>
                <p className="list_item_description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                <a href="#">Learn More</a>
                </p>
                <div className="list_item_image">

                </div>
                <input type="checkbox"/>
              </div>
              </Container>
              <Container> 
              <div className="list_item">
                <p className="list_item_title">Pull Up</p>
                <p className="list_item_description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                <a href="#">Learn More</a>
                </p>
                <div className="list_item_image">

                </div>
                <input type="checkbox"/>
              </div>
              </Container>
              <Container> 
              <div className="list_item">
                <p className="list_item_title">Pull Up</p>
                <p className="list_item_description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                <a href="#">Learn More</a>
                </p>
                <div className="list_item_image">

                </div>
                <input type="checkbox"/>
              </div>
              </Container>
              <Container> 
              <div className="list_item">
                <p className="list_item_title">Pull Up</p>
                <p className="list_item_description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                <a href="#">Learn More</a>
                </p>
                <div className="list_item_image">

                </div>
                <input type="checkbox"/>
              </div>
              </Container>
              <Container> 
              <div className="list_item">
                <p className="list_item_title">Pull Up</p>
                <p className="list_item_description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                <a href="#">Learn More</a>
                </p>
                <div className="list_item_image">

                </div>
                <input type="checkbox"/>
              </div>
              </Container>
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

export default Home;