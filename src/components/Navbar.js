import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Navbar({title,links}){
    return(
      <div className="navbar" style={{background: "#D8D8D8"}}>
        <Container>
        <h2>{title}</h2>
        <div className="navbar_list">
        <ul>
        {links()}
        {/* {links.length > 0 ? links.map((link,index)=>(
          
            <li key={index}>{link}</li>
          
        )):""} */}
        </ul>
        </div>
        </Container>
      </div>
    )

}

// Navbar.propTypes={
//   title: PropTypes.string.isRequired,
//   links: PropTypes.func.isRequired,

// }

export default Navbar;