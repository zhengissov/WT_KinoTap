import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import './signin.css';
import Request from 'superagent';
import decode from 'jwt-decode';

var info = ' ';
export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: [],username: '', id: '',email: '', password: '',confirm_password: '',
    info:'  ',cnt: 1, movieList: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount() {

  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = "http://localhost:8000/api-token-auth/"
      Request.post(url)
          .type('form')
          .send({username: this.state.username})
          .send({password: this.state.password})
          .then(res => {
            console.log(res);
             console.log(res.body.token);
            localStorage.setItem('id_token', res.body.token);
        })
  }

   loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

  render() {
    return(
      <div className="container">
      <div class="form-wrapper">
          <h1 className="hea">Sign In</h1>
          <form className="forma" onSubmit={this.handleSubmit}>

            <div class="form-item">
              <label for="username"></label>
              <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required autocomplete="off"></input>
            </div>

            <div class="form-item">
              <label for="password"></label>
              <input type="password"  id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required autocomplete="off"></input>
            </div>

            <div class="button-panel">
              <input type="submit" class="button" title="Sign In" value="Sign In"></input>
            </div>


          </form>
          <h>{this.state.info}</h>
        </div>
      </div>

    );
  }
}

 