import React from "react";

const RecipePriceForm = ({ selectedPrice, updateSelectedPrice }) => (
  <section className="section">
    Combien coûte-t-elle ?
    <div className="flex-container">
      <input
        id="price0"
        className="hidden-input"
        type="radio"
        name="price"
        data-index="0"
        onChange={updateSelectedPrice}
        checked={selectedPrice === "0"}
      />
      <label className="add-form__radio-group" htmlFor="price0">
        <span>
          <i className="icon-vcheap" />
        </span>
        Bon marché
      </label>
      <input
        id="price1"
        className="hidden-input"
        type="radio"
        name="price"
        data-index="1"
        onChange={updateSelectedPrice}
        checked={selectedPrice === "1"}
      />
      <label className="add-form__radio-group" htmlFor="price1">
        <span>
          <i className="icon-cheap" />
        </span>
        Peu chère
      </label>
      <input
        id="price2"
        className="hidden-input"
        type="radio"
        name="price"
        data-index="2"
        onChange={updateSelectedPrice}
        checked={selectedPrice === "2"}
      />
      <label className="add-form__radio-group" htmlFor="price2">
        <span>
          <i className="icon-exp" />
        </span>
        Assez chère
      </label>
      <input
        id="price3"
        className="hidden-input"
        type="radio"
        name="price"
        data-index="3"
        onChange={updateSelectedPrice}
        checked={selectedPrice === "3"}
      />
      <label className="add-form__radio-group" htmlFor="price3">
        <span>
          <i className="icon-vexp" />
        </span>
        Chère
      </label>
    </div>
  </section>
);

export default RecipePriceForm;
