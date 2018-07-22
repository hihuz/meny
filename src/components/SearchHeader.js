import React from "react";
import Link from "react-router-dom/Link";
import SearchSettings from "./SearchSettings";

const SearchHeader = ({ handleSearchTermChange, searchTerm, page }) => (
  <section className="main-search">
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
    {page === "landing" ? (
      <Link to="/browse" className="main-search__adv-link">
        Recherche avancée
      </Link>
    ) : (
      <SearchSettings />
    )}
  </section>
);

export default SearchHeader;
