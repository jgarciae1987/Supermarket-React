import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Axios from 'axios';




class App extends Component{
  
  constructor() {
    super();
    const token = window.localStorage.getItem('token');
    Axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
  }

  render(){
    return(   
      <Routes />
    );
  }
}

export default App;