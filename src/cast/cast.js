import React from 'react';
import Request from 'superagent'
import './cast.css';
import {Link} from 'react-router-dom';

export class Cast extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.cast);
    this.state = {
      cast: [],
      movie_id: props.cast,
    }
  }
  


  componentDidMount() {
    let url = "http://localhost:8000/kinotap/api/v1/cast/movie/" + this.state.movie_id
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      console.log(obj);
      this.setState ({
        cast: obj
      })
    })
  }

  render() {
    return(
      <div>
        <h3>Басты рөлдерде</h3>
         <div className="figureContainer">
          {this.state.cast.map((element, index) => {
            return(
              
                <figure key={index}>
                <Link to={`/cast/${this.state.cast[index].id}`}>
                  <img src={this.state.cast[index].profile_path} key={index} alt={this.state.cast[index].name} className="imgResponsive" />
                  <figcaption>{this.state.cast[index].name}</figcaption>
                </Link>
                </figure>
              
            )
          })}
        </div>
      </div>
    );
  }
}
