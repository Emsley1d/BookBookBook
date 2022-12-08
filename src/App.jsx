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

const initialBooks = [
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

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState("search", "React");

  const [books, setBooks] = React.useState(initialBooks);

  const handleRemoveBook = (item) => {
    const newBooks = books.filter(
      (book) => item.objectID !== book.objectID
    );

    setBooks(newBooks)
  };

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
        isFocused
        onInputChange={handleSearch}
      >

        <strong>Search:</strong>
      </InputWithLabel>

      {/* <Search search={searchTerm} onSearch={handleSearch} /> */}

      <hr />

      <List list={searchedBooks} onRemoveItem={handleRemoveBook} />
    </div>
  );
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {

  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      {/* {" "} */}
      {/* this is a react fragment; shorthand version of <React.Fragment> */}
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef} 
        id={id} 
        type={type} 
        value={value} 
        autoFocus={isFocused} 
        onChange={onInputChange} />
    </>
  );
  }

  const List = ({ list, onRemoveItem }) => (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );

  const Item = ({ item, onRemoveItem }) => {
    const handleRemoveItem = () => {
      onRemoveItem(item);
    };
    return (
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
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Remove
          </button>
      </span>
    </li>
  );
    };
  export default App;
