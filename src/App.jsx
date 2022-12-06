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

  const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}></input>
      
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>

    </div>
  )};

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
        <a href={props.item.url}>{props.item.title} </a>
      </span>
      <span>by {props.item.author}</span>
      <br />
      <span>Number of comments: {props.item.num_comments}</span>
      <br />
      <span>Rating: {props.item.rating}</span>
      </li>
      );

      return (
      <div>
        <h1>{title.name}</h1>
        <h3>{title.tagline}</h3>

        <Search />

        <br />
        <hr />

        <List list={books} />
      </div>
      );
};

      export default App;
