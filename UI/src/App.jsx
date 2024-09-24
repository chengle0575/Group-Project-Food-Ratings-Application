import React from 'react';
import ReactDOM from'react-dom';
import HomePage from './HomePage.jsx'
import {AddPage} from './AddPage.jsx'
import homepageImg from './assets/rumman';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


//NavBar
class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-bar">
        <Link className="nav-link" to="/home">HOME</Link>
        <Link className="nav-link" to="/add">ADD</Link>
      </div>
    );
  }
}


//LandingPage
function LandingPage() {
  return (
    <div className="container mt-4">
      <div className="hero jumbotron bg-gradient" style={{ background: 'linear-gradient(135deg, #EDE8F5 0%, #7091E6 100%)' }}>
        <h1 className="display-4">Discover the Best Restaurants That Meet Your Needs</h1>
        <p className="lead">Explore top-rated spots with ease and confidence.</p>
        <Link to="/home" className="btn btn-primary">Get Started</Link>
      </div>
      <img src={homepageImg} alt="Delicious food spread" className="img-fluid rounded"/>
    </div>
  );
}


//Here is the main App component
class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<><NavBar /><HomePage/></>} />
          <Route path="/add" element={<><NavBar /><AddPage/></>} />
        </Routes>
      </Router>
    );
  }
}

const element = <App />;
ReactDOM.render(element, document.getElementById('contents'));
