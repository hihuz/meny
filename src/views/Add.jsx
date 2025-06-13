import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormInput, addNewRecipe, resetAddForm } from "../actions/";
import { getAddFormValidState } from "../reducers";
import Header from "../components/Header";
import AddHeader from "../components/AddHeader";
import InputListForm from "../components/InputListForm";
import DurationsForm from "../components/DurationsForm";
import ServingsForm from "../components/ServingsForm";
import RecipePriceForm from "../components/RecipePriceForm";
import RecipeTypeForm from "../components/RecipeTypeForm";
import RecipeSeasonForm from "../components/RecipeSeasonForm";

const noop = () => {};

const Add = () => {
  const dispatch = useDispatch();

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
  } = useSelector(state => state.addForm);

  const user = useSelector(state => state.curUser);
  const validState = useSelector(getAddFormValidState);

  const [focusState, setFocusState] = useState({
    nameHasFocus: true,
    ingredientsHasFocus: true,
    stepsHasFocus: true,
    servingsHasFocus: true,
    prepTimeHasFocus: true,
    cookingTimeHasFocus: true
  });

  const handleInputChange = useCallback((e) => {
    const target = e.target;
    const value = target.type === "radio" ? target.checked : target.value;
    const field = target.name;
    const index = target.getAttribute("data-index") || 0;
    const type = "add";
    dispatch(updateFormInput({ field, index, value, type }));
  }, [dispatch]);

  const handleInputFocus = useCallback((e) => {
    setFocusState(prev => ({ ...prev, [`${e.target.name}HasFocus`]: true }));
  }, []);

  const handleInputBlur = useCallback((e) => {
    setFocusState(prev => ({ ...prev, [`${e.target.name}HasFocus`]: false }));
  }, []);

  const onSubmit = () => {
    dispatch(addNewRecipe({
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
      authorId: user.id,
      authorName: user.sn
    }));
  };

  return (
    <main className="add">
      <Header page="add">
        {user.id === "unknown" && (
          <div className="add-form__user-error tooltip-container">
            <div className="tooltip info-msg arrow-top arrow-right">
              <i className="icon-ban" />
              Sélectionnez un utilisateur avant d{"'"}ajouter votre recette
            </div>
          </div>
        )}
        <AddHeader
          value={name}
          updateName={handleInputChange}
          handleFocus={handleInputFocus}
          handleBlur={handleInputBlur}
          showError={!focusState.nameHasFocus && !validState.name}
        />
      </Header>
      <div className="container add-form">
        <section className="section">
          <p className="section__title">
            Voulez-vous la décrire un peu plus ? <em>(optionnel)</em>
          </p>
          <input
            className="add-form-textfield"
            type="text"
            name="desc"
            value={desc}
            onChange={handleInputChange}
          />
        </section>
        <hr />
        <RecipeTypeForm selectedType={type} updateSelectedType={handleInputChange} />
        <hr />
        <InputListForm
          listItems={ingredients}
          updateListItem={handleInputChange}
          handleBlur={handleInputBlur}
          handleFocus={handleInputFocus}
          buttonDisabled={!validState.ingredients}
          field="ingredients"
          listLabels={[
            "Quels ingrédients faut-il pour la préparer ?",
            "Ajouter un ingrédient",
            "Vérifiez votre liste d'ingrédients"
          ]}
          showError={!focusState.ingredientsHasFocus && !validState.ingredients}
          type="add"
        />
        <hr />
        <ServingsForm
          value={servings}
          updateServings={handleInputChange}
          handleBlur={handleInputBlur}
          handleFocus={handleInputFocus}
          showError={!focusState.servingsHasFocus && !validState.servings}
        />
        <hr />
        <RecipePriceForm selectedPrice={price} updateSelectedPrice={handleInputChange} />
        <hr />
        <RecipeSeasonForm selectedSeason={season} updateSelectedSeason={handleInputChange} />
        <hr />
        <InputListForm
          listItems={steps}
          updateListItem={handleInputChange}
          handleBlur={handleInputBlur}
          handleFocus={handleInputFocus}
          buttonDisabled={!validState.steps}
          field="steps"
          listLabels={[
            "Quelles sont les étapes à suivre pour la préparer ?",
            "Ajouter une étape",
            "Vérifiez votre liste d'étapes"
          ]}
          showError={!focusState.stepsHasFocus && !validState.steps}
          textarea
          type="add"
        />
        <hr />
        <DurationsForm
          prepTime={prepTime}
          cookingTime={cookingTime}
          updateTime={handleInputChange}
          handleBlur={handleInputBlur}
          handleFocus={handleInputFocus}
          showPrepError={!focusState.prepTimeHasFocus && !validState.prepTime}
          showCookingError={!focusState.cookingTimeHasFocus && !validState.cookingTime}
        />
        <hr />
        <section className="section">image (add later)</section>
        <hr />
        <section className="section">
          <p className="section__title">
            Quelques notes complémentaires ? <em>(optionnel)</em>
          </p>
          <textarea
            className="add-form-textfield"
            name="note"
            value={note}
            onChange={handleInputChange}
          />
        </section>
        <section className="section">
          <button
            className="button-large button-centered"
            disabled={!validState.isValidState || user.id === "unknown"}
            onClick={
              validState.isValidState && user.id !== "unknown"
                ? onSubmit
                : noop
            }
          >
            Ajouter ma recette !
          </button>
        </section>
      </div>
    </main>
  );
};

export default Add;

