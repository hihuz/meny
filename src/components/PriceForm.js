import React from 'react';

const PriceForm = ({
  selectedPrice,
  updateSelectedPrice
}) => (
  <div className="add-form-block add-form-block--flex">Coût de la recette:
    <label>
      <i className="icon-vcheap"></i>
      <input id="price0" className="hidden-input" type="radio" name="price" />
      Bon marché
    </label>
    <label>
      <i className="icon-cheap"></i>
      <input id="price1" className="hidden-input" type="radio" name="price" />
      Peu cher
    </label>
    <label>
      <i className="icon-exp"></i>
      <input id="price2" className="hidden-input" type="radio" name="price" />
      Assez cher
    </label>
    <label>
      <i className="icon-vexp"></i>
      <input id="price3" className="hidden-input" type="radio" name="price" />
      Cher
    </label>
  </div>
);

export default PriceForm;


