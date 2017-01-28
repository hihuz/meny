import React from 'react';
import { connect } from 'react-redux';
import { setCurSeason, setSeasonFilter, setOrderBy, setSearchTerm } from '../actions/';
import Header from '../components/Header';
import SearchHeader from '../components/SearchHeader';
import LandingCard from '../components/LandingCard';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.setSeasonFilter = this.setSeasonFilter.bind(this);
    this.setOrderByDate = this.setOrderByDate.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  componentDidMount() {
    this.props.dispatchSetCurSeason();
  }
  setSearchTerm(e) {
    this.props.dispatchSetSearchTerm(e.target.value);
  }
  setSeasonFilter() {
    this.props.dispatchSetSeasonFilter(this.props.seasonCode);
  }
  setOrderByDate() {
    this.props.dispatchSetOrderBy({ by: 'date', type: 'ltf'});
  }
  // change the "latest" image, right now it is a pug in a scarf.
  render() {
    return (
      <main className='landing'>
        <Header background={'landing'}>
          <SearchHeader
            handleSearchTermChange={this.setSearchTerm}
            searchTerm={this.props.searchTerm}
            showAdvancedSearch
          />
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
            text={'Tout chaud !'}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const seasonCode = state.curSeason;
  const labels = {
    0: ['woof', 'Les légumes congelés ça marche aussi..'],
    1: ['winter', 'Des poireaux, des choux, des carottes, des choux, des poireaux et encore des poireaux !'],
    2: ['spring', 'add later (asperges)'],
    3: ['summer', 'Enfin l\'été! Tomates, courgettes, poivrons aubergines...'],
    4: ['autumn', 'add later']
  };
  return {
    seasonCode,
    seasonLabel: labels[seasonCode][0],
    seasonText: labels[seasonCode][1],
    searchTerm: state.searchTerm
  }
}
const mapDispatchToProps = dispatch => ({
  dispatchSetCurSeason: () => dispatch(setCurSeason()),
  dispatchSetSeasonFilter: (season) => dispatch(setSeasonFilter(season)),
  dispatchSetOrderBy: (settings) => dispatch(setOrderBy(settings)),
  dispatchSetSearchTerm: (value) => dispatch(setSearchTerm(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
