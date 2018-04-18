import React from 'react';
import {Link} from 'react-router-dom';
import './formResults.css';

export class FormResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    document.getElementById('results').className = 'noDisplay';
    document.getElementById('searchInput').value = '';
  }

  render() {
    console.log(this.props.results);
    return(
      <ul id="results" onClick={this.handleClick}>
        {this.props.results.map((element, index) => {
          return(
            <li key={index} onClick={this.handleClick}>
              <Link to={`/${this.props.type}/${this.props.results[index].id}`} >
                <img src={this.props.results[index].poster_path} alt={`${this.props.results[index].title} poster`} className="resultPoster" />
                <div className="resultMovie">
                  <p>{this.props.results[index].title}</p>
                  <p>{this.props.results[index].release_date}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    );
  }
}
