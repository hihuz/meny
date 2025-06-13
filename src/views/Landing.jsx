import React from "react";
import { connect } from "react-redux";
import { setSearchFilter, setSearchTerm } from "../actions/";
import Header from "../components/Header";
import SearchHeader from "../components/SearchHeader";
import LandingCard from "../components/LandingCard";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.setSeasonFilter = this.setSeasonFilter.bind(this);
    this.setOrderByDate = this.setOrderByDate.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }
  setSearchTerm(e) {
    this.props.dispatchSetSearchTerm(e.target.value);
  }
  setSeasonFilter() {
    this.props.dispatchSetSearchFilter({
      name: "season",
      value: this.props.seasonCode
    });
  }
  setOrderByDate() {
    this.props.dispatchSetSearchFilter({
      name: "orderBy",
      value: "date"
    });
    this.props.dispatchSetSearchFilter({
      name: "orderType",
      value: "ftl"
    });
  }
  // change the "latest" image, right now it is a pug in a scarf.
  render() {
    return (
      <main className="landing">
        <Header page={"landing"}>
          <SearchHeader
            handleSearchTermChange={this.setSearchTerm}
            searchTerm={this.props.searchTerm}
            page={"landing"}
          />
        </Header>
        <div className="container">
          <h3 className="content-title">En manque d{"'"}inspiration ?</h3>
          <LandingCard
            path="/browse"
            background={this.props.seasonLabel}
            clickHandler={this.setSeasonFilter}
            title="Recettes de saison"
            text={this.props.seasonText}
          />
          <LandingCard
            path="/browse"
            background="woof"
            clickHandler={this.setOrderByDate}
            title="Dernières recettes ajoutées"
            text={"Tout chaud !"}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  const seasonCode = state.curSeason;
  const labels = {
    0: ["woof", "Les légumes congelés ça marche aussi.."],
    1: [
      "winter",
      "Des poireaux, des choux, des carottes, des choux, des poireaux et encore des poireaux !"
    ],
    2: ["spring", "Ca pousse, ça bourgeonne, enfin de la verdure !"],
    3: ["summer", "Enfin l'été! Tomates, courgettes, poivrons aubergines..."],
    4: ["autumn", "add later"]
  };
  return {
    seasonCode,
    seasonLabel: labels[seasonCode][0],
    seasonText: labels[seasonCode][1],
    searchTerm: state.searchTerm
  };
};

export default connect(
  mapStateToProps,
  {
    dispatchSetSearchFilter: setSearchFilter,
    dispatchSetSearchTerm: setSearchTerm
  }
)(Landing);
