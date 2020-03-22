import React from 'react';

function Header({logo}){
  
    return(
      <div style={{backgroundColor:"blue"}}>
        <img style={{width:"120px"}} src={logo} alt=""/>
        <h1>Mindera <span>Fitness</span></h1>
      </div>
    )

}

export default Header;