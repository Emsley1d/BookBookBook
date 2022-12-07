import * as React from "react";

const title = {
  name: "Book Book Book",
  tagline: "Personal Book Library",
};

const App = () => {
  const books = [
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      url: "https://en.wikipedia.org/wiki/Project_Hail_Mary",
      num_comments: 2,
      rating: 4.5,
      objectID: 0,
    },
    {
      title: "The Martian",
      author: "Andy Weir",
      url: "https://en.wikipedia.org/wiki/The_Martian_(Weir_novel)",
      num_comments: 4,
      rating: 5,
      objectID: 1,
    },
    {
      title: "The Long Earth",
      author: "Terry Pratchett",
      url: "https://en.wikipedia.org/wiki/The_Long_Earth",
      num_comments: 1,
      rating: 4,
      objectID: 2,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>{title.name}</h1>
      <h3>{title.tagline}</h3>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={searchedBooks} />
    </div>
  );
};

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={props.onSearch} />
  </div>

);

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <br />
    <span>Author: {props.item.author}</span>
    <br />
    <span>Comments: {props.item.num_comments}</span>
    <br />
    <span>Rating: {props.item.rating}</span>
  </li>
);

export default App;
