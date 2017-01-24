import React from 'react';
import Header from '../components/Header';
import LandingHeader from '../components/LandingHeader';
import Card from '../components/Card';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className='landing'>
        <Header background={'landing'}>
          <LandingHeader />
        </Header>
        <div className='container'>
          <h3 className='landing-title'>En manque d'inspiration ?</h3>
          <Card type='wide' />
          <Card type='wide' />
        </div>
      </main>
    );
  }
}

export default Landing;
