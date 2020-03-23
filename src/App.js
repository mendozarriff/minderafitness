import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Main from './components/Main';
import logo from './components/images/logo.png';

function App() {

  
  return (
    <div className="App">
      <Header logo={logo}/>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
