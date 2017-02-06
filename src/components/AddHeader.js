import React from 'react';

const AddHeader = ({
  value,
  updateName
}) => (
  <section className="main-add">
    <h3 className="add-main-title">
      Quel est le nom de votre recette ?
    </h3>
    <input
      type="text"
      className="main-search-bar"
      value={value}
      onChange={updateName}
      name="name"
    />
  </section>
);

export default AddHeader;
