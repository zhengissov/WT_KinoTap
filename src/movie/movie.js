import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import {Cast} from '../cast/cast';
import './movie.css';
import Request from 'superagent'
import StarRatingComponent from 'react-star-rating-component';
import decode from 'jwt-decode';

export class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        //genres: [],
        //cast: [],
      },
      user: [],
      movie_id: props.match.params.id,
    }
    this.addMovie = this.addMovie.bind(this);
    this.openModal = this.openModal.bind(this)

  }

componentDidMount() {
    let url = "http://localhost:8000/kinotap/api/v1/movie/" + this.state.movie_id
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      this.setState ({
        movie: obj
      })
    })


    let token = localStorage.getItem('id_token');
    console.log(token);
    if(!!token){
      this.setState({
        user: decode(token)
      })      
    }

  }

  addMovie(){
    console.log(this.state.user.user_id);
    console.log(this.state.movie.id);
   let url = "http://localhost:8000/kinotap/api/v1/profile/movieAdd/"
      Request.post(url)
          .type('form')
          .send({user_id: this.state.user.user_id})
          .send({movieid: this.state.movie.id})
          .then(res => {
            console.log(res);
            alert("added");
        })
  }

    onStarClick(nextValue, prevValue, name) {
      this.setState({rating: nextValue});
    }
    openModal () {
      this.setState({isOpen: true})
    }

  render() {
    console.log(this.state.movie);
    return(
      <div className="container">
        <Form id="form" type="movie"/>
        <div className="moviePage">

          <div className="poster">
            <img src={this.state.movie.poster_path} alt={`${this.state.movie.title} poster`} className="posterImg" />
            <h2>Rating from state: {this.state.movie.rating}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={this.state.movie.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
          </div>

          <div className="movieDetails">
            <h className="sectionTitle">{this.state.movie.title}</h>
            <ul className="detailsList">
              <li><span className="bold">Түпнұсқа атауы: </span> {this.state.movie.original_title}</li>
              <li><span className="bold">Режиссер: </span> {this.state.movie.director}</li>
              <li><span className="bold">Рейтинг: </span> {this.state.movie.rating}</li>
              <li><span className="bold">Бюджет: </span> $ {this.state.movie.budget}</li>
              <li><span className="bold">Әлемдік табысы: </span>$ {this.state.movie.revenue}</li>
              <li><span className="bold">Шығу уақыты: </span> {this.state.movie.release_date}</li>
              <li><span className="bold">Ұзақтығы: </span> {this.state.movie.runtime} минут</li>
              
            </ul>

            <p>{this.state.movie.overview}</p>

            <div class="button-panel">
              <input type="submit" class="button" title="Add Watched" value="Add Watched" onClick={this.addMovie}></input>
           </div>

           <div style={{fontSize: 26}}>
        <h2>{this.state.movie.rating}</h2>
 
        </div>
          </div>
        </div>
        
        <Cast cast={this.state.movie_id} />
      </div>
    );
  }
}
