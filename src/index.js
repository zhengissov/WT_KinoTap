import React from 'react';
import ReactDOM from 'react-dom';
//import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from './home';
import { Movie } from './movie/movie';
import { News } from './news/news';
import { MovieMain } from './movie/movieMain';
import { NewsMain } from './news/newsMain';
import { SignIn } from './auth/signin';
import { Join } from './auth/join';
import { Profile } from './profile/profile';
import { CastDetails } from './cast/castDetails'
import './index.css';
import { Dropdown } from 'semantic-ui-react'
import { HomepageLayout } from './HomepageLayout'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }

  render() {
    return (
      <div>
      <Router>
      <div>
    <div>
        <div className="ui violet large borderless inverted menu">
        <div className="ui container">
        
        <a class="link item">
            <Link to={'/'}><h style={{"font-size": "22px"}}>KinoTap</h></Link>
          </a>
        <div class="right menu">

        <Link to={'/movieMain'} class="link item" aria-current="false">
              <span> Кинодерек </span>
        </Link>
        
        <Link to={'/newsMain'} class="link item" aria-current="false">
              <span> Жаңалықтар </span>
        </Link>
        <div class="ui simple dropdown item" class="link item" aria-current="false">

          <div class="ui simple dropdown item">
    <i class="fa fa-users"></i> Members <i class="fa fa-caret-down"></i>
    <div class="menu">
        <a class="item"><i class="fa fa-users"></i> Players</a>
        <a class="item"><i class="fa fa-user-md"></i> Staff</a>
    </div>
    </div>

        </div>

        
        <div class="item">
                <div>
                  <Link to={'/auth/join'} class="ui green large button" role="button">Тіркелу</Link>
                  <Link to={'/auth/signin'} class="ui large basic inverted button" role="button" >Кіру</Link>
                </div>
            </div>
        </div>

      </div>
        </div>
       
      <Route exact path="/movieMain" component={MovieMain} />
      <Route path="/newsMain" component={NewsMain} />
      <Route path={'/auth/signin'} component={SignIn} />
      <Route path={'/auth/join'} component={Join} />
      <Route path={'/movie/:id'} component={Movie} />
      <Route path={'/cast/:id'} component={CastDetails} />
      <Route path={'/news/:id'} component={News} />
    </div>
 
    <div class="ui simple dropdown item">
    <i class="fa fa-users"></i> Members <i class="fa fa-caret-down"></i>
    <div class="menu">
        <a class="item"><i class="fa fa-users"></i> Players</a>
        <a class="item"><i class="fa fa-user-md"></i> Staff</a>
    </div>
</div>

          <Dropdown text='Рейтингтер' class="simple dropdown item">
            <Dropdown.Menu style={{"marginTop": "50px"}}>
              <Dropdown.Item>
                <Link to={'/'} class="link item" aria-current="false">
                  <span> Үздік фильмдер </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={'/'} class="link item" aria-current="false">
                  <span> Табыс рекордтары </span>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
 </Router>

      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
