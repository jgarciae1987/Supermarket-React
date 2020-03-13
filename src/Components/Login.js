import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email     : "",
      password  : "",
    };  

    this.getInputLogin = this.getInputLogin.bind(this);
    this.sendingLogin = this.sendingLogin.bind(this);
  }

  getInputLogin(e){
    const { value, name } = e.target;
     
		this.setState({
			[name]: value 
    });
    //console.log(this.state);
  }

  sendingLogin(e) {
    e.preventDefault();
 
    Axios.post('http://supermarket_api.local/api/users/login.json', this.state)
    .then((response) => {
      
      var token = response.data.token;
      localStorage.setItem("token", token);
      Axios.defaults.headers.common['Authorization'] = 'Bearer '+token;

      window.location = "welcome";

    }) .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="container" >
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 p-5" style={{backgroundColor: "#eee"}}>
            <form onSubmit={this.sendingLogin}>

              <div className="form-group">
                <label>Usuario</label>
                <input type="text" className="form-control" name="email" onChange={ this.getInputLogin } required></input>
              </div>  
              
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={ this.getInputLogin } required></input>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;