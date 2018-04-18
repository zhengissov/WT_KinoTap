import React from 'react';
import ReactDOM from 'react-dom';
//import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Home} from './home';
import {Movie} from './movie/movie';
import {News} from './news/news';
import {MovieMain} from './movie/movieMain';
import {NewsMain} from './news/newsMain';
import {SignIn} from './auth/signin';
import {Join} from './auth/join';
import {Profile} from './profile/profile';
import {CastDetails} from './cast/castDetails'
import './index.css';
import { Dropdown } from 'semantic-ui-react'
import {HomepageLayout} from './HomepageLayout'

export class App2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  render() {
    return(
      <div>
      {/*
      <BrowserRouter>
        <Switch>
          <Route path={'/movieMain/'} component={MovieMain} authTrue="yes"/>
          <Route path={'/newsMain/'} component={NewsMain} />
          <Route path={'/movie/:id'} component={Movie} />
          <Route path={'/cast/:id'} component={CastDetails} />
          <Route path={'/news/'} component={News} />
          <Route path={'/auth/signin'} component={SignIn} />
          <Route path={'/auth/join'} component={Join} />
          <Route path={'/profile/profile'} component={Profile} />
          <Route path={'/'} component={Home}/>
        </Switch>
      </BrowserRouter>
      */}


      <div class="ui large borderless inverted menu">
        <div class="ui container">

          <a class="link item" href="/" >
            <span>Seeuletter</span>
          </a>
          <div class="right menu">
            <a class="link item" aria-current="false" title="Solutions" href="/solutions">
              <span>&nbsp;&nbsp;&nbsp;Solutions</span>
            </a>
            <a class="link item" aria-current="false" title="Tarifs" href="/tarifs/courrier">
              <span>&nbsp;&nbsp;&nbsp;Tarifs</span>
            </a>
            <a class="link item" aria-current="false" title="Tarifs" href="/tarifs/courrier">
              <span>&nbsp;&nbsp;&nbsp;Tarifs</span>
            </a>
            <div class="item">
                <div>
                  <a class="ui green large button" role="button" href="/signup">Inscription</a>
                  <a class="ui large basic inverted button" role="button" href="/login">Connexion</a>
                </div>
            </div>
          </div>  
        </div>
      </div>


      <Router>
    <div>
        <div class="ui large borderless inverted menu">
        <div class="ui container">
        <Link to={'/'}><a class="link item">
            <span>Seeuletter</span>
          </a>
        </Link>
        <div class="right menu">
        <Link to={'/movieMain'} >
        <span class="link item" aria-current="false">
              <span>&nbsp;Movie</span>
            </span>
        </Link>
        <Link to={'/newsMain'}><a class="link item">
              <span>&nbsp;News</span>
            </a></Link>

        <div class="item">
                <div>
                  <Link to={'/auth/signin'}><a class="ui green large button" role="button" href="/signup">Inscription</a></Link>
                  <Link to={'/auth/join'}><a class="ui large basic inverted button" role="button" href="/login">Connexion</a></Link>
                </div>
            </div>
        </div>

      </div>
        </div>
       
      <hr />

      <Route exact path="/movieMain" component={MovieMain} />
      <Route path="/news" component={NewsMain} />
      <Route path={'/auth/signin'} component={SignIn} />
          <Route path={'/auth/join'} component={Join} />
    </div>
  </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <App2 />,
  document.getElementById('root')
);
