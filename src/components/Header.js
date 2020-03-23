import React from 'react';

function Header({logo}){
  
    return(
      <div className="header" style={{backgroundColor:"blue"}}>
      <div className="container">
      <img style={{width:"120px"}} src={logo} alt=""/>
      <h1 style={{color: "white"}}>MINDERA <span style={{fontWeight:"bold", fontFamily:"Arial Narrow"}}>FITNESS</span></h1>
      </div>
        
        
      </div>
    )

}

export default Header;