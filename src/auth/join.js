import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import './join.css';

import Request from 'superagent';

export class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: [],username: '', email: '', password: '',confirm_password: '',cnt: 1, movieList: ["2","3"]};

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
    
  componentDidMount() {
    
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange2(event) {
    this.setState({ [event.target.name]: event.target.value });
   
      if(event.target.value != this.state.password) {
      event.target.setCustomValidity("Passwords Don't Match");
      }
      else{
        event.target.setCustomValidity("");
      }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let url = "http://localhost:8000/kinotap/api/v1/auth/join/"
      Request.post(url)
          .type('form')
          .send({username: this.state.username})
          .send({password1: this.state.password})
          .send({password2: this.state.password})
          .send({email: this.state.email})
          .then((callback) => {console.log(callback)})    
  }

  render() {
    return(
      <div className="container">
       <div class="form-wrapper">
          <h1 className="hea">Join Us</h1>
          <form className="forma" onSubmit={this.handleSubmit}>
            <div class="form-item">

            
              <label for="email"></label>
              <input type="email" id="email" name="email"  placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required autocomplete="off"></input>
            </div>

            <div class="form-item">
              <label for="username"></label>
              <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required autocomplete="off"></input>
            </div>

            <div class="form-item">
              <label for="password"></label>
              <input type="password"  id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required autocomplete="off"></input>
            </div>

            <div class="form-item">
              <label for="confirm_password"></label>
              <input type="password"  id="confirm_password" name="confirm_password" placeholder="Confirm password" value={this.state.confirm_password} onChange={this.handleChange2} required ></input>
            </div>
            <div class="button-panel">
              <input type="submit" class="button" title="Join Us" value="Join Us"></input>
            </div>
          </form>
          <div class="form-footer">
            <p>Already a member?  <a href="http://localhost:3001/auth/signin">Sign in now</a></p>
          </div>
        </div>

      </div>

    );
  }
}

 