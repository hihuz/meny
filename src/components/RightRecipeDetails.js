import React from 'react';

const labels = {
  season: [
    'Toutes saisons',
    'Recette d\'hiver',
    'Recette de printemps',
    'Recette d\'été',
    'Recette d\'automne'
  ],
  price: ['Bon marché', 'Peu chère', 'Assez chère', 'Chère'],
  type: ['', 'Entrée', 'Plat principal', 'Accompagnement', 'Dessert']
};

// this will be used later if I want to add the icons
// const iconClasses = {
//   season: ['', 'winter', 'spring', 'summer', 'autumn'],
//   price: ['vcheap', 'cheap', 'exp', 'vexp'],
//   type: ['', 'starter', 'main-course', 'accomp', 'dessert']
// };

const RightRecipeDetails = ({
  season,
  type,
  price,
  editable,
  editing,
  cancelChanges,
  saveChanges,
  updateInput,
  switchToEdit,
  showError
}) => (
  <div className="recipe-details__part recipe-details__right">
    {editable && !editing ?
      <div className="section__edit-actions" style={{ left: '26rem', right: 'auto' }}>
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name="rightDetails"
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    {editable && editing ?
      <div className="section__edit-actions" style={{ left: '22rem', right: 'auto' }}>
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name="rightDetails"
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name="rightDetails"
        >
          <i className="icon-undo" />
        </button>
      </div> : null}
    <div>
      {editing ?
        <select
          value={price}
          onChange={updateInput}
          name="price"
          className="recipe-details__select"
        >
          {labels.price.map((label, i) => <option value={i} key={i}>{label}</option>)}
        </select> :
        labels.price[price]
      }
    </div>
    <div>
      {editing ?
        <select
          value={type}
          onChange={updateInput}
          name="type"
          className="recipe-details__select"
        >
          {labels.type
            .map((label, i) => (
              i > 0 ? <option value={i} key={i}>{label}</option> : null)
            )}
        </select> :
        labels.type[type]
      }
    </div>
    <div>
      {editing ?
        <select
          value={season}
          onChange={updateInput}
          name="season"
          className="recipe-details__select"
        >
          {labels.season.map((label, i) => <option value={i} key={i}>{label}</option>)}
        </select> :
        labels.season[season]
      }
    </div>
  </div>
);

export default RightRecipeDetails;
