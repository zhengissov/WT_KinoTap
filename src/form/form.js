import React from 'react';
import {FormResults} from './formResults';
import search from './search.svg';
import './form.css';
import Request from 'superagent'


export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      tv: [],
      news: [],
      results: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
     let url = "http://localhost:8000/kinotap/api/v1/movie/"
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        movie: obj
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleKeyUp() {
    document.getElementById('results').className = 'formResults';
    let val = document.getElementById('searchInput').value;

    if (val === '') {
      document.getElementById('results').className = 'noDisplay';
    }

    let a = this.props.type;
    if(a=="movie"){
      let updatedList = this.state.movie.filter((data) => {
      return data.title.toLowerCase().indexOf(val) !== -1;
      });
      this.setState ({
      results: updatedList
    })
    }
    else if(a=="tv"){
      let updatedList = this.state.tv.filter((data) => {
      return data.title.toLowerCase().indexOf(val) !== -1;
      });
      this.setState ({
      results: updatedList
    })
    }
    else{
      let updatedList = this.state.news.filter((data) => {
      return data.title.toLowerCase().indexOf(val) !== -1;
      });
      this.setState ({
      results: updatedList
    })
    }
  }

  render() {
    let names =  this.props.type + ' іздеу';
    return(
      <form onSubmit={this.handleSubmit} id="form">
        <img src={search} alt="search icon" className="searchIcon" />
        <input onKeyUp={this.handleKeyUp} id="searchInput" className="searchBar" type="text" placeholder={names} required />
        <FormResults results={this.state.results} type={this.props.type}/>
      </form>
    );
  }
}
