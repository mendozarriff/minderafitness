import React from 'react';
import { Container } from 'react-bootstrap';

function Footer({addFilterBg}){
  
    return(
      <div className="footer" style={{filter:addFilterBg}}>
      <Container>
        <p>Developed by Jose Mendoza | 2020</p>
        </Container>
      </div>
    )

}

export default Footer;