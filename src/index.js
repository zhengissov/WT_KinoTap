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
    this.logout = this.logout.bind(this);
  }

  logout(){
    localStorage.removeItem('id_token');
    window.location = "http://localhost:3000/";
  }

  render() {
    let token = localStorage.getItem('id_token');
    if(!token){
       return (
      <div >
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
   

        <div class="ui simple dropdown item">
          <i class="fa fa-users"></i> Рейтингтер <i class="fa fa-caret-down"></i>
          <div class="menu">
            <a class="item" > <div><Link to={'/movieMain'} > ҮЗДІК ФИЛЬМДЕР </Link> </div> </a> 
            <a class="item"> <div><Link to={'/movieMain'} > ТАБЫС РЕКОРДТАРЫ </Link> </div></a>
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
      <Route path={'/profile'} component={Profile} />
    </div>
 
          </div>
 </Router>

      </div>
    );
    }
    else{
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

        <div class="ui simple dropdown item">
    <i class="fa fa-users"></i> Рейтингтер <i class="fa fa-caret-down"></i>
    <div class="menu">
         <a class="item" > <div><Link to={'/movieMain'} > ҮЗДІК ФИЛЬМДЕР </Link> </div> </a> 
        <a class="item"> <div><Link to={'/movieMain'} > ТАБЫС РЕКОРДТАРЫ </Link> </div></a>
    </div>
    </div>

    <div class="ui simple dropdown item">
    <div class="ui large basic inverted button"> Профиль </div>
    <div class="menu">
         <a class="item" > <div><Link to={'/profile'} > Профиль </Link> </div> </a> 
        <a class="item" onClick={this.logout}> <div> Шығу </div></a>
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
      <Route path={'/profile'} component={Profile} />
    </div>
          </div>
 </Router>

      </div>
    );
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
