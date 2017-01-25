import React from 'react';
import { connect } from 'react-redux';
import { setCurSeason, setSeasonFilter, setOrderBy } from '../actions/';
import Header from '../components/Header';
import LandingHeader from '../components/LandingHeader';
import CardLink from '../components/CardLink';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.setSeasonFilter = this.setSeasonFilter.bind(this);
    this.setOrderByDate = this.setOrderByDate.bind(this);
  }
  componentDidMount() {
    this.props.dispatchSetCurSeason();
  }
  setSeasonFilter() {
    this.props.dispatchSetSeasonFilter(this.props.season);
  }
  setOrderByDate() {
    this.props.dispatchSetOrderBy({ type: 'date', order: 'latest'});
  }
  //CHECK IF THE ONCLICK IS TRIGGERED HERE OR IF I NEED TO PASS IT TO THE CHILD COMPONENT
  render() {
    return (
      <main className='landing'>
        <Header background={'landing'}>
          <LandingHeader />
        </Header>
        <div className='container'>
          <h3 className='landing-title'>En manque d'inspiration ?</h3>
          <CardLink
            path='browse'
            onClick={this.setSeasonFilter}
            title='Recettes de saison'
            text={this.props.seasonText}
            season={this.props.season}
          />
          <CardLink
            path='browse'
            onClick={this.setOrderByDate}
            title='Dernières recettes ajoutées !'
            text={'get them while they\'re hot'}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  season: state.curSeason.season,
  seasonText: state.curSeason.seasonText
});
const mapDispatchToProps = dispatch => ({
  dispatchSetCurSeason: () => dispatch(setCurSeason()),
  dispatchSetSeasonFilter: (season) => dispatch(setSeasonFilter(season)),
  dispatchSetOrderBy: (settings) => dispatch(setOrderBy(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
