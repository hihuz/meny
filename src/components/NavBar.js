import React from 'react';
import Link from 'react-router/Link';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.setSeasonFilter = this.setSeasonFilter.bind(this);
    this.setOrderByDate = this.setOrderByDate.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  handleUserClick(e) {

  }

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav__logo">
          Meny
        </Link>
        <div className='nav__list'>
          <Link to="/browse" className="nav__list-item" activeClassName="nav__list-item--cur">
            Parcourir
          </Link>
          <Link to="/favorites" className="nav__list-item" activeClassName="nav__list-item--cur">
            Favoris
          </Link>
          <Link to="/add" className="nav__list-item" activeClassName="nav__list-item--cur">
            Ajouter
          </Link>
        </div>
        <NavUser user={this.props.username} userClickHandler={handleUserClick} />
      </nav>
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
  dispatchSetSearchFilter: (settings) => dispatch(setSearchFilter(settings)),
  dispatchSetSearchTerm: (value) => dispatch(setSearchTerm(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
