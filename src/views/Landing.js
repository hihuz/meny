import React from 'react';
import { connect } from 'react-redux';
import { setCurSeason, setSeasonFilter, setOrderBy } from '../actions/';
import Header from '../components/Header';
import LandingHeader from '../components/LandingHeader';
import LandingCard from '../components/LandingCard';

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
    this.props.dispatchSetSeasonFilter(this.props.seasonCode);
  }
  setOrderByDate() {
    this.props.dispatchSetOrderBy({ type: 'date', order: 'latest'});
  }
  // change the "latest" image, right now it is a pug in a scarf.
  // fix the text on these cards being purple..
  render() {
    return (
      <main className='landing'>
        <Header background={'landing'}>
          <LandingHeader />
        </Header>
        <div className='container'>
          <h3 className='landing-title'>En manque d'inspiration ?</h3>
          <LandingCard
            path='browse'
            background={this.props.seasonLabel}
            clickHandler={this.setSeasonFilter}
            title='Recettes de saison'
            text={this.props.seasonText}
          />
          <LandingCard
            path='browse'
            background='woof'
            clickHandler={this.setOrderByDate}
            title='Dernières recettes ajoutées'
            text={'Les dernières innovations de la haute cuisine vous seront révélées..'}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const code = state.curSeason;
  const labels = {
    0: ['woof', 'Les légumes congelés ça marche aussi..'],
    1: ['winter', 'Des poireaux, des choux, des carottes, des choux, des poireaux et encore des poireaux..'],
    2: ['spring', 'Des asperges & whatnot'],
    3: ['summer', 'ENFIN ! TOMATES COURGETTES POIVRONS AUBERGINES !!!!'],
    4: ['autumn', 'errrr, not sure right now']
  };
  const cur = state.curSeason;
  return {
    seasonCode: code,
    seasonLabel: labels[code][0],
    seasonText: labels[code][1]
  }
}
const mapDispatchToProps = dispatch => ({
  dispatchSetCurSeason: () => dispatch(setCurSeason()),
  dispatchSetSeasonFilter: (season) => dispatch(setSeasonFilter(season)),
  dispatchSetOrderBy: (settings) => dispatch(setOrderBy(settings))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
