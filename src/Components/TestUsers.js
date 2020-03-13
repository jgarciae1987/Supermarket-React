import React, { Component } from 'react';
import Axios from 'axios';


class TestUsers extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };

    Axios.get('http://supermarket_api.local/api/users/test.json')
    .then((response) => {
      this.setState({
        users: response.data.users,
      });      
    })
    .catch((error) => {
      console.log(error);
    })
    
    
  }

  render(){

    const users = this.state.users.map((user, idx) => {
      return(
        <tr key={idx}>
          <td>{ user.id }</td>
          <td>{ user.email }</td>
          <td>{ user.created }</td>
        </tr>
      );
    });

    
    
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <td style={{width: "5%"}}>ID</td>
            <td>User</td>
            <td>Created</td>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
    );
  }
}

export default TestUsers;