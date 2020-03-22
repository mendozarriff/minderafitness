import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import logo from './components/images/logo.png';

function App() {

  
  return (
    <div className="App">
      <Header logo={logo}/>
      <Footer />
    </div>
  );
}

export default App;
