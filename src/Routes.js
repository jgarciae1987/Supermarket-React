import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";


import PageHome from './Components/PageHome';
import PageWelcome from './Components/PageWelcome';
// import PageUsers from './Components/PageUsers';

  
class Routes extends Component {   
  
  render(){
    {
      var token = window.localStorage.getItem('token');
    }
    
    return(
      <BrowserRouter>
        <Route exact path = '/' component = { PageHome }></Route>
        <Route path = '/welcome' component = { PageWelcome }></Route> 
        {/* <Route path = '/test-users' component = { PageUsers }></Route> */}

      </BrowserRouter>
    );
  }
}

export default Routes;