import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { changeCurRecipe, hideTransition } from '../actions/';
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
    if (this.props.type === 'transition-link') {
      this.props.dispatchHideTransition();
    }
    this.props.dispatchChangeCurRecipe(this.props.recipe);
  }
  render() {
    const { id, type } = this.props;
    return (
      <Link className={type} to={`/recipes/${id}`} onClick={this.handleClick}>
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
  {
    dispatchChangeCurRecipe: changeCurRecipe,
    dispatchHideTransition: hideTransition
  }
)(RecipeLink);
