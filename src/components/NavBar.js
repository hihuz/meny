import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/Link';
import { setUsername } from '../actions/';
import UserMenu from './UserMenu';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false
    };
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenuOutsideClick = this.handleMenuOutsideClick.bind(this);
  }

  toggleMenu() {
    if (!this.state.isMenuVisible) {
      document.addEventListener('click', this.handleMenuOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleMenuOutsideClick, false);
    }
    this.setState(prevState => ({
      isMenuVisible: !prevState.isMenuVisible
    }));
  }
  handleMenuClick(e) {
    e.preventDefault();
    this.toggleMenu();
  }
  handleUserClick(e) {
    e.preventDefault();
    this.toggleMenu();
    this.props.dispatchSetUsername(e.currentTarget.getAttribute('value'));
  }
  handleMenuOutsideClick() {
    this.toggleMenu();
  }

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="nav__logo">
          Meny
        </Link>
        <div className="nav__list">
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
        <UserMenu
          curUser={this.props.curUser}
          userClickHandler={this.handleUserClick}
          menuClickHandler={this.handleMenuClick}
          isMenuVisible={this.state.isMenuVisible}
          users={this.props.users}
        />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  curUser: state.curUser
});

const mapDispatchToProps = dispatch => ({
  dispatchSetUsername: name => dispatch(setUsername(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
