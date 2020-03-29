import React from 'react';

function Header({ logo, addFilterBg }){

    return(
      <div className="header" style={{backgroundColor:"blue", filter:addFilterBg}}>
    
      <img src={logo} alt=""/>
      <h1 style={{color: "white"}}>MINDERA <span style={{fontWeight:"bold", fontFamily:"Arial Narrow"}}>FITNESS</span></h1>
  
        
        
      </div>
    )

}

export default Header;