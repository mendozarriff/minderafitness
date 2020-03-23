import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Navbar({title,links}){
    return(
      <div className="navbar" style={{background: "#D8D8D8"}}>
        <Container>
        <h2>{title}</h2>
        <div className="navbar_list">
        <ul>
        {links.length > 0 ? links.map((link,index)=>(
          
            <li key={index}>{link}</li>
          
        )):""}
        </ul>
        </div>
        
        {/* <Row>
          <Col xs></Col>
          <Col xs></Col>
          <Col xs></Col>
          <Col xs> </Col>
        </Row> */}
        </Container>
      </div>
    )

}

export default Navbar;