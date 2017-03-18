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
      <div className="section__edit-actions" style={{ left: '20rem', right: 'auto' }}>
        <button
          className="icon-button edit-actions__button"
          onClick={switchToEdit}
          name={'rightDetails'}
        >
          <i className="icon-pencil" />
        </button>
      </div> : null}
    {editable && editing ?
      <div className="section__edit-actions" style={{ left: '20rem', right: 'auto' }}>
        {!showError ?
          <button
            className="icon-button edit-actions__button"
            onClick={saveChanges}
            name={'rightDetails'}
          >
            <i className="icon-floppy-o" />
          </button> : null
        }
        <button
          className="icon-button edit-actions__button"
          onClick={cancelChanges}
          name={'rightDetails'}
        >
          <i className="icon-undo" />
        </button>
      </div> : null}
    <div>
      {editing ?
        <select value={price} onChange={updateInput}>
          {labels.price.map((label, i) => <option value={i}>{label}</option>)}
        </select> :
        labels.price[price]
      }
    </div>
    <div>
      {editing ?
        <select value={price} onChange={updateInput}>
          {labels.type.map((label, i) => (i > 0 ? <option value={i}>{label}</option> : null))}
        </select> :
        labels.type[type]
      }
    </div>
    <div>
      {editing ?
        <select value={price} onChange={updateInput}>
          {labels.season.map((label, i) => <option value={i}>{label}</option>)}
        </select> :
        labels.season[season]
      }
    </div>
  </div>
);

export default RightRecipeDetails;
