import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Navbar(){
  
    return(
      <div className="navbar" style={{background: "#D8D8D8"}}>
        <Container>
        <h2>Choose Body Part</h2>
        <div className="navbar_list">
        <p>Upper-body</p>
        <p>Lower-body</p>
        <p>Full-body</p>
        <p>All</p>
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