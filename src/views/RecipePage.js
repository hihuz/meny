import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {
  updateFormInput,
  updateRecipe,
  changeCurRecipe,
  deleteRecipe,
  showModal,
  hideModal
} from '../actions/';
import {
  getEditableStatus,
  getCurRecipeValidState,
  getCurRecipe,
  getMatchingRecipe
} from '../reducers';
import ModalContent from '../components/ModalContent';
import InputListForm from '../components/InputListForm';
import RecipeItemList from '../components/RecipeItemList';
import Header from '../components/Header';
import RecipeHeader from '../components/RecipeHeader';
import EditHeader from '../components/EditHeader';
import LeftRecipeDetails from '../components/LeftRecipeDetails';
import RightRecipeDetails from '../components/RightRecipeDetails';
import RecipeNotes from '../components/RecipeNotes';
import FloatingActions from '../components/FloatingActions';
import '../styles/recipe-page.css';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // This is most likely temporary, the idea of the below is to dispatch
    // an action updating "curRecipe" when the recipe page is accessed directly
    // and when the recipes have been fetched from firebase
    if (!this.props.hasRecipesData && nextProps.hasRecipesData) {
      this.props.dispatchChangeCurRecipe(this.props.storedRecipe);
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'radio' ? target.checked : target.value;
    const field = target.name;
    const index = target.getAttribute('data-index') || value;
    const type = 'edit';
    this.props.dispatchUpdateFormInput({ field, index, value, type });
  }

  switchMode() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  saveChanges() {
    const {
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img,
      created,
      authorId,
      authorName,
      index,
      id
    } = this.props;
    this.props.dispatchUpdateRecipe({
      name,
      desc,
      ingredients,
      steps,
      prepTime,
      cookingTime,
      price,
      type,
      season,
      servings,
      note,
      img,
      created,
      authorId,
      authorName
    }, { index, id });
    this.switchMode();
  }

  cancelChanges() {
    // when the user cancels the changes he is making, we call changeCurRecipe
    // with the "storedRecipe" props which gives us the recipe as it is in the
    // store currently. This is the same action creator that we call when we
    // change routes, seems cleaner this way
    // The other option was to not have "storedRecipe" as props
    // and access the store from the action creators but I didn't like that too much
    this.props.dispatchChangeCurRecipe(this.props.storedRecipe);
    this.switchMode();
  }

  deleteRecipe() {
    const recipeId = this.props.id;
    const authorId = this.props.authorId;
    this.props.dispatchDeleteRecipe({ recipeId, authorId });
  }

  showModal() {
    this.props.dispatchShowModal();
  }

  hideModal() {
    this.props.dispatchHideModal();
  }

  render() {
    const {
      id,
      img,
      name,
      desc,
      authorName,
      prepTime,
      cookingTime,
      servings,
      ingredients,
      price,
      type,
      season,
      steps,
      note,
      editable,
      validState,
      hasRecipesData,
      storedRecipe
    } = this.props;
    const editing = this.state.editing;
    const modalStyles = {
      overlay: {
        zIndex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      },
      content: {
        width: '400px',
        left: '50%',
        marginLeft: '-200px',
        height: '230px',
        top: '50%',
        marginTop: '-110px'
      }
    };
    return (
      <main className="recipe">
        <Modal
          isOpen={this.props.modalOpened}
          onRequestClose={this.hideModal}
          style={modalStyles}
          contentLabel="Modal"
        >
          <ModalContent confirm={this.deleteRecipe} cancel={this.hideModal} />
        </Modal>
        {hasRecipesData ?
          <Header page="recipe" id={id} img={img}>
            {editing ?
              <EditHeader
                updateInput={this.handleInputChange}
                name={name}
                desc={desc}
                author={authorName}
                storedRecipe={storedRecipe}
              /> :
              <RecipeHeader
                name={name}
                desc={desc}
                author={authorName}
                storedRecipe={storedRecipe}
              />
            }
          </Header> :
          <div className="container" style={{ paddingTop: '8rem', marginTop: '8rem' }}>
            <div className="loader-container">
              <div className="loader">
                Chargement...
              </div>
            </div>
          </div>
        }
        {hasRecipesData ?
          <div className="container">
            <section className="recipe-details">
              <LeftRecipeDetails
                prepTime={prepTime}
                cookingTime={cookingTime}
                servings={servings}
                editing={editing}
                updateInput={this.handleInputChange}
              />
              <RightRecipeDetails
                price={price}
                type={type}
                season={season}
                editing={editing}
                updateInput={this.handleInputChange}
              />
            </section>
            <hr />
            {editing ?
              <InputListForm
                listItems={ingredients}
                updateListItem={this.handleInputChange}
                buttonDisabled={!validState.ingredients}
                field="ingredients"
                listLabels={[
                  'Ingrédients :',
                  'Ajouter un ingrédient',
                  'Vérifiez votre liste d\'ingrédients'
                ]}
                type="edit"
              /> :
              <RecipeItemList
                listItems={ingredients}
                listTitle="Ingrédients :"
                field="ingredients"
              />}
            <hr />
            {editing ?
              <InputListForm
                listItems={steps}
                updateListItem={this.handleInputChange}
                buttonDisabled={!validState.steps}
                field="steps"
                listLabels={[
                  'Préparation :',
                  'Ajouter une étape',
                  'Vérifiez votre liste d\'étapes'
                ]}
                textarea
                type="edit"
              /> :
              <RecipeItemList
                listItems={steps}
                listTitle="Préparation :"
                name="steps"
              />}
            {note || editing ? <hr /> : null }
            {note || editing ? <RecipeNotes
              note={note}
              updateInput={this.handleInputChange}
              editing={editing}
              cancelChanges={this.cancelChanges}
            /> : null }
            {editable ?
              <FloatingActions
                editing={editing}
                switchMode={this.switchMode}
                showModal={this.showModal}
                saveChanges={this.saveChanges}
                cancelChanges={this.cancelChanges}
                isValid={validState.isValidState}
              /> : null}
          </div> : null
        }
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const curRecipe = getCurRecipe(state);
  const validState = getCurRecipeValidState(state);
  const editable = getEditableStatus(state, ownProps.match.params.id);
  const storedRecipe = getMatchingRecipe(state, ownProps.match.params.id);
  const hasRecipesData = state.hasRecipesData;
  const modalOpened = state.modal.opened;
  return Object.assign(
    {},
    { editable, validState, storedRecipe, hasRecipesData, modalOpened },
    curRecipe
  );
};

export default connect(
  mapStateToProps,
  {
    dispatchChangeCurRecipe: changeCurRecipe,
    dispatchUpdateFormInput: updateFormInput,
    dispatchUpdateRecipe: updateRecipe,
    dispatchDeleteRecipe: deleteRecipe,
    dispatchShowModal: showModal,
    dispatchHideModal: hideModal
  }
)(RecipePage);
