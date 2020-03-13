import React, { Component } from 'react';
import {  Link } from "react-router-dom";


class Menu extends Component{
  
  logout() {
    localStorage.removeItem('token');
    console.log("Regresa pronto"); 
    window.location = "/"; 
  }

  
  render(){
    var token = window.localStorage.getItem('token'); //asigna en una variable el localStorage

    return(
        <div className="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-dark text-white     border-bottom box-shadow">
          <Link className="btn btn-outline-secondary my-0 mr-md-auto font-weight-normal text-white p-1" to = "/">
          &nbsp;&nbsp; Supermarket &nbsp;&nbsp;
          </Link>
          <nav className="my-2 my-md-0 mr-md-3">
            
            
          
          {/* <Link className="p-2 text-white" to = "test-users">Users</Link> */}
          </nav>
          {
            token == null ? 
            null
            :
            <Link className="p-2 text-white" to = "/welcome">Welcome</Link>
          }

          {
            token == null ? 
            <Link className="p-2 text-white" to = "/">Home</Link>
            :  
            <button className="btn btn-danger" onClick={ this.logout } ><i className="fas fa-sign-out-alt" ></i> Logout</button>
          }

         
          {/* <a className="btn btn-outline-primary" href="#"><i className="fas fa-sign-in-alt"></i> Login</a> */}
        </div>

    );
  }
}

export default Menu;