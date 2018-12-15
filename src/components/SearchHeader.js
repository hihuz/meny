import React, { Component } from "react";
import withRouter from "react-router-dom/withRouter";
import Link from "react-router-dom/Link";
import SearchSettings from "./SearchSettings";

class SearchHeader extends Component {
  constructor() {
    super();

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(e) {
    e.preventDefault();
    this.props.history.push("/browse");
  }

  render() {
    const { handleSearchTermChange, searchTerm, page } = this.props;

    return (
      <form className="main-search" onSubmit={this.submitSearch}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="main-search-bar"
        />
        <Link to="/browse" className="main-search__reg-link">
          <i className="icon-search" />
        </Link>
        <button type="submit" className="invisible" />
        {page === "landing" ? (
          <Link to="/browse" className="main-search__adv-link">
            Recherche avancée
          </Link>
        ) : (
          <SearchSettings />
        )}
      </form>
    );
  }
}

export default withRouter(SearchHeader);
