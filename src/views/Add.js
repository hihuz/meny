import React from 'react';
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';

const Add = () => (
  <main className="add">
    <Header background={'add'}>
      <AddHeader />
    </Header>
    <div className="container add-form">
      <form>

        <div>description : <input type="text" /></div>
        <div>
          ingredient 1 : <input type="text" />
          ingredient 2 : <input type="text" />
          ingredient 3 : <input type="text" />
          ingredient 4 : <input type="text" />
          ingredient 5 : <input type="text" />
          ingredient 6 : <input type="text" />
          ingredient 7 : <input type="text" />
          ingredient 8 : <input type="text" />
        </div>
        <div>temps de préparation : <input type="number" maxLength="2" /> minutes</div>
        <div>temps de cuisson : <input type="number" maxLength="2" /> minutes</div>
        <div>prix (icons):
          <fieldset>
            <label><input type="radio" name="price" /> peu cher</label>
            <label><input type="radio" name="price" /> moyennement cher</label>
            <label><input type="radio" name="price" /> cher</label>
            <label><input type="radio" name="price" /> très cher!</label>
          </fieldset>
        </div>
        <div>nombre d'assiettes (slider ?) : <input type="number" maxLength="2" /></div>
        <div>type (icons) :
            <label><input type="radio" name="type" /> entrée</label>
          <label><input type="radio" name="type" /> plat principal</label>
          <label><input type="radio" name="type" /> dessert</label>
        </div>
        <div>
          étape 1 : <input type="text" />
          étape 2 : <input type="text" />
          étape 3 : <input type="text" />
          étape 4 : <input type="text" />
          étape 5 : <input type="text" />
          étape 6 : <input type="text" />
          étape 7 : <input type="text" />
          étape 8 : <input type="text" />
        </div>
        <div>image (add later)</div>
        <div>additional note <input type="text" /></div>

        <button>ajouter !</button>
      </form>
    </div>
  </main>
);

export default Add;
