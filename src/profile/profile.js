import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import Request from 'superagent'
import decode from 'jwt-decode';

export class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      movies: []
    };
    //this.logout = this.logout.bind(this);
  }

  componentWillMount() {
let token = localStorage.getItem('id_token');
this.setState({
  user: decode(token)
})
    console.log(decode(token).user_id);
    let url = "http://localhost:8000/kinotap/api/v1/profile/" + decode(token).user_id + "/";
    console.log(url);
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        movies: obj
      })
    })
}

  render() {
    console.log(this.state.user)
    return(
      <div className="container">
        <h2>Welcome {this.state.user.username}</h2>

          <p className="quote">Сіз көрген фильмдер</p>
      
          <div className="newMovies">
          {this.state.movies.map((movie, index) => {
            return (
              <Link to={`/movie/${movie.id}`} key={movie} className="movieLink">
                <img src={movie.poster_path} alt={`${movie.title} poster`} className="imgResponsive" />
                
                <div className="movieInfo">
                  <span>{movie.release_date}</span>
                  <span>{movie.rating} ★</span>

                </div>
                <p className="movieTitle">{movie.title}</p>
              </Link>
            )
          })}
        </div>

      </div>
    );
  }
}

 