import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { changeCurRecipe } from '../actions/';
import { getMatchingRecipe } from '../reducers';

// this component is a wrapper around Link used exclusively
// to update the "curRecipe" in the store
// so it should be called for every Link to a recipe instead of plain Link
class RecipeLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.dispatchChangeCurRecipe(this.props.recipe);
  }
  render() {
    const { id } = this.props;
    return (
      <Link className="card" to={`/recipes/${id}`} onClick={this.handleClick}>
        {this.props.children}
      </Link>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recipe: getMatchingRecipe(state, ownProps.id)
});

export default connect(
  mapStateToProps,
  { dispatchChangeCurRecipe: changeCurRecipe }
)(RecipeLink);
