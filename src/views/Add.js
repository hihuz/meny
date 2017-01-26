import React from 'react';
import Header from '../components/Header';
import AddHeader from '../components/AddHeader';

const Add = (props) => (
  <main className='add'>
    <Header background={'add'}>
      <AddHeader />
    </Header>
    <div className="container">
      <form>
        - description (main)<br />
        - ingredients (list)<br />
        - preparation time<br />
        - cooking time<br />
        - price<br />
        - servings<br />
        - type<br />
        - steps (list)<br />
        - image (you have one ?)<br />
        - bottom / additional note<br />
      </form>
    </div>
  </main>
);

export default Add;
