import * as React from "react";

const title = {
  name: "Book Book Book",
  tagline: "Personal Book Library",
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
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

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

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

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      >

        <strong>Search:</strong>
      </InputWithLabel>

      {/* <Search search={searchTerm} onSearch={handleSearch} /> */}

      <hr />

      <List list={searchedBooks} />
    </div>
  );
};

const InputWithLabel = ({ id, label, value, type = "text", onInputChange, children }) => (
  <>
    {" "}
    {/* this is a react fragment; shorthand version of <React.Fragment> */}
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <br />
    <span>Author: {item.author}</span>
    <br />
    <span>Comments: {item.num_comments}</span>
    <br />
    <span>Rating: {item.rating}</span>
  </li>
);

export default App;
