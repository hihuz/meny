import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavBar from '../components/NavBar';

// use props.children for ContentContainer ?
const Landing = (props) => (
  <div>
    <NavBar />
    <Header />
    <ContentContainer />
    <Footer />
  </div>
);

export default Landing;
