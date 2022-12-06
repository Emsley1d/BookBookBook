import * as React from 'react';
import List from './List';



const title = {
  name: 'Book Book Book',
  tagline: 'Personal Book Library',
};

const App = () => {
    <div>

      <h1>{title.name}</h1>
      <h3>{title.tagline}</h3>

      <Search />


      <br />
      <hr />

      <List />

    </div>
};

const Search = () => {
    <div>
      <label htmlFor='search'>Search: </label>
      <input id="search" type="text"></input>
    </div>
};


export default App; 