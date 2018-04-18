import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import {Cast} from '../cast/cast';
import Request from 'superagent'
import StarRatingComponent from 'react-star-rating-component';
import YouTube from 'react-youtube';
import ModalVideo from 'react-modal-video'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class CastDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.id);
    this.state = {
      movies: [],
        users: [],
        user: [],
        isOpen: false,
        cast_id: props.match.params.id,
        cast: [],
    }

    this.addMovie = this.addMovie.bind(this);
    this._onReady = this._onReady.bind(this);
    this.openModal = this.openModal.bind(this)

  }

componentDidMount() {
    let url = "http://localhost:8000/kinotap/api/v1/movie/cast/" + this.state.cast_id
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        movies: obj
      })
    })

    let url3 = "http://localhost:8000/kinotap/api/v1/cast/" + this.state.cast_id
    Request.get(url3).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        cast: obj
      })
    })
  }

  addMovie(){
    //alert(this.state.user.movieList);
    //alert(window.location.pathname.substring(7));
    
    var newArray = this.state.user;    
    newArray.movieList.push(window.location.pathname.substring(7)-1);
    this.setState({
      user: newArray
    });

    var arr = [newArray];
    let url2 = "http://localhost:3000/api/timers5"
            Request.put(url2)
            .type('form')
            .send({ id: this.state.users[0].id })
            .send({ email: this.state.users[0].email})
            .send({ username: this.state.users[0].username})
            .send({ password: this.state.users[0].password})
            .send({ movieList: newArray.movieList})
            .then((callback) => {})
            //window.location.href='http://localhost:3001/profile/profile/';



    //console.log(this.state.user.movieList);
    //console.log(arr);
    // let url2 = "http://localhost:3000/api/timers5"
    //         Request.put(url2)
    //         .type('form')
    //         .send({ id: this.state.users[index].id })
    //         .send({ email: this.state.users[index].email})
    //         .send({ username: this.state.users[index].username})
    //         .send({ password: this.state.users[index].password})
    //         .then((callback) => {})
    //         window.location.href='http://localhost:3001/profile/profile/';

  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

    onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  openModal () {
    this.setState({isOpen: true})
  }

  render() {
    console.log(this.state.movies);
    console.log(this.state.cast);
    return(
      <div className="container">
        <Form id="  form" type="movie"/>
        <div className="moviePage">
        
        <div className="poster">
            <img src={this.state.cast.profile_path} alt={`${this.state.user.name} poster`} className="posterImg" />
        </div>
        <div className="movieDetails">
            <h className="sectionTitle">{this.state.cast.name}</h>
            <ul className="detailsList">
              <li><span className="bold">Еңбек жолы: </span> {this.state.cast.job}</li>
              <li><span className="bold">Жынысы: </span> {this.state.cast.gender}</li>
              <li><span className="bold">Туған күні: </span> {this.state.cast.birth_date}</li>
              <li><span className="bold">Туған жері: </span> {this.state.cast.birth_place}</li>
              <li><span className="bold">Барлық фильмы: </span> {this.state.movies.length}</li>
            </ul>

      </div>
        </div>
        <br style={{clear: ''}} />
      <p style={{"font-size":"22px"}}>Фильмдері</p>
        
        <div className="newMovies">
          {this.state.movies.map((movie, index) => {
            return (
              <Link to={`/movie/${this.state.movies[index].id}`} key={index} className="movieLink">
                <img src={this.state.movies[index].poster_path} alt={`${this.state.movies.title} poster`} className="imgResponsive" />
                
                <div className="movieInfo">
                  <span>{this.state.movies[index].release_date}</span>
                  <span>{this.state.movies[index].rating} ★</span>

                </div>
                <p className="movieTitle">{this.state.movies[index].title}</p>
              </Link>
            )
          })}
        </div>
      </div>
    );
  }
}
