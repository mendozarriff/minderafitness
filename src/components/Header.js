import React from 'react';

function Header({logo}){
  
    return(
      <div className="header" style={{backgroundColor:"blue"}}>
    
      <img src={logo} alt=""/>
      <h1 style={{color: "white"}}>MINDERA <span style={{fontWeight:"bold", fontFamily:"Arial Narrow"}}>FITNESS</span></h1>
  
        
        
      </div>
    )

}

export default Header;