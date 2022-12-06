import * as React from 'react';

const title = {
  name: 'Book Book Book',
  tagline: 'Personal Book Library',
};

const App = () => (
  <div>

    <h1>{title.name}</h1>
    <h3>{title.tagline}</h3>

    <Search />

    <br />
    <hr />

    <List />

  </div>
);

const Search = () => (
  <div>
    <label htmlFor='search'>Search: </label>
    <input id="search" type="text"></input>
  </div>
);

const List = () => (
  <div>
    <ul>
      {list.map((item) => (
        <li key={item.objectID}>
          <span>
            <a href={item.url}>{item.title} </a>
          </span>
          <span>by {item.author}</span>
          <br />
          <span>Number of comments: {item.num_comments}</span>
          <br />
          <span>Rating: {item.rating}</span>
        </li>
      ))}
    </ul>
  </div>
);


const list = [
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    url: 'https://en.wikipedia.org/wiki/Project_Hail_Mary',
    num_comments: 2,
    rating: 4.5,
    objectID: 0,
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    url: 'https://en.wikipedia.org/wiki/The_Martian_(Weir_novel)',
    num_comments: 4,
    rating: 5,
    objectID: 1,
  },
  {
    title: 'The Long Earth',
    author: 'Terry Pratchett',
    url: 'https://en.wikipedia.org/wiki/The_Long_Earth',
    num_comments: 1,
    rating: 4,
    objectID: 2,
  }
]

export default App; 