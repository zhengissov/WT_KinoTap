import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import {SearchExampleStandard} from '../form/search';
import './movieMain.css';
import Request from 'superagent';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

var options = [
  {
    text: 'Rating Descending',
    value: 'Rating Descending'
  },
  {
    text: 'Rating Ascending',
    value: 'Rating Ascending'
  },
  {
    text: 'Release Date Descending',
    value: 'Release Date Descending'
  },
  {
    text: 'Release Date Ascending',
    value: 'Release Date Ascending'
  },
  {
    text: 'Title (A-Z)',
    value: 'Title (A-Z)'
  },
  {
    text: 'Title (Z-A)',
    value: 'Title (Z-A)'
  }
]


export class MovieMain extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      movies: [],
    };
    this.changed = this.changed.bind(this);
    this.sort = this.sort.bind(this);
  }
    
  componentDidMount() {
    let url = "http://localhost:8000/kinotap/api/v1/movie/"
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        movies: obj
      })
    })
  }

  sort(list,data){
    //alert(list.rating);
    if(data=="Rating Descending"){
      list.sort(function(a, b) {
        return b.rating - a.rating;
      });
    }
    else if(data=="Rating Ascending"){
      list.sort(function(a, b) {
        return a.rating - b.rating;
      });
    }
    else if(data=="Title (A-Z)"){
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if(data=="Title (Z-A)"){
      list.sort((a, b) => a.title.localeCompare(b.title)).reverse();
    }
    else if(data=="Release Date Descending"){
      list.sort(function(a,b){
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }
    else if(data=="Release Date Ascending"){
      list.sort(function(a,b){
        return new Date(b.release_date) - new Date(a.release_date);
      }).reverse();
    }

    this.setState({
        movies : list
      })
  }

  changed(event,data){
    console.log(data.value);
    this.sort(this.state.movies, data.value);
  }


  render() {
    console.log(this.state.movies);
    return(
      <div className="container">
        <Form type="movie"/>
        
        <p className="quote">Танымал фильмдер</p>
      
        <span className="sort1">
          <Dropdown id='dr1' placeholder='Sort movie' fluid selection options={options} onChange={this.changed}></Dropdown>
        </span>

        <br style={{clear: 'both'}} />
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

 