import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from '../form/form';
import './news.css';
import Request from 'superagent'

export class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      news_id: props.match.params.id,
    }
  }

componentDidMount() {
    let url = "http://localhost:8000/kinotap/api/v1/news/" + this.state.news_id
    Request.get(url).then((response) => {
      let obj = JSON.parse(response.text);
      this.setState ({
        news: obj
      })
    })
  }

  render() {
    //console.log(this.state.news);
    return(
      <div className="container">
        <Form id="form" />
        <div className="newsPage">

            <p className="quote">{this.state.news.title}</p>
            <span className="bold">{this.state.news.release_date}  |  Оқылу: {this.state.news.viewCnt}</span>
            <br style={{clear: ''}} />
          <div className="poster2">
            <img src={this.state.news.poster_path} alt={`${this.state.news.title} poster`} className="posterImg2" />
          </div>
          <br style={{clear: ''}} />
          <div className="movieDetails">
            <ul className="detailsList2">
              <p>{this.state.news.concept}</p>
            </ul>
            <br style={{clear: ''}} />
            <p style={{"white-space": "pre-wrap"}}>{this.state.news.overview}</p>
            

          </div>
        </div>
      </div>
      );  
  }
}
