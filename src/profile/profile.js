import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import Request from 'superagent'


export class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: [],movies: [], listt: []
    };
    this.logout = this.logout.bind(this);
  }

   componentWillMount() {

    let url = "http://localhost:3000/api/timers"
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        movies: obj
      })
    })


    let url2 = "http://localhost:3000/api/timers5"
    Request.get(url2).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      console.log(obj.length);
      this.setState ({
        user: obj[0],
        listt: obj[0].movieList
      })
    })


  }

  logout(){
    let url = "http://localhost:3000/api/timers5"
    Request.put(url)
    .type('form')
    .send({ id: "" })
    .send({ email: ""})
    .send({ username: ""})
    .send({ password: ""})
    .then((callback) => {})

    window.location.href='http://localhost:3001/';
  }

  render() {
    console.log(this.state.movies);
    console.log(this.state.user.movieList);
    console.log(this.state.listt);
    return(
      <div className="container">
        <h2>Welcome {this.state.user.username}</h2>
        <h2>{this.state.listt}</h2>
        <h2>{this.state.user.email}</h2>

          <div class="button-panel">
            <input type="submit" class="button" title="Log out" value="Log out" onClick={this.logout}></input>
          </div>

          <div className="newMovies">
          {this.state.listt.map((movie, index) => {
            return (
              <Link to={`/movie/${this.state.movies[movie].id}`} key={movie} className="movieLink">
                <img src={this.state.movies[movie].poster_path} alt={`${this.state.movies.title} poster`} className="imgResponsive" />
                
                <div className="movieInfo">
                  <span>{this.state.movies[movie].release_date}</span>
                  <span>{this.state.movies[movie].rating} ★</span>

                </div>
                <p className="movieTitle">{this.state.movies[movie].title}</p>
              </Link>
            )
          })}
        </div>

      </div>
    );
  }
}

 