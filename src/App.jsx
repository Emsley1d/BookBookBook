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

const getAsyncBooks = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { books: initialBooks } }),
      2000
    )
  );

// const getAsyncBooks = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(reject, 2000));


const booksReducer = (state, action) => {
  switch (action.type) {
    case 'BOOKS_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'BOOKS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'BOOKS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_BOOK':
      return {
        ...state,
        data: state.data.filter(
          (book) => action.payload.objectID !== book.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {

  const [searchTerm, setSearchTerm] = useStorageState("search", " ");

  // const [books, dispatchBooks] = React.useReducer(booksReducer,[]);
  // const [isLoading, setIsLoading] = React.useState(false); 
  // const [isError, setIsError] = React.useState(false)

  // Above can be reduced to the below:

  const [books, dispatchBooks] = React.useReducer(booksReducer,
    { data: [], isLoading: false, isError: false }
  );


  React.useEffect(() => {
    dispatchBooks({ type: 'BOOKS_FETCH_INIT' });

    getAsyncBooks().then(result => {
      dispatchBooks({
        type: 'BOOKS_FETCH_SUCCESS',
        payload: result.data.books,
      });
    })
      .catch(() =>
        dispatchBooks({ type: 'BOOKS_FETCH_FAILURE' })
      );
  }, []);

  const handleRemoveBook = (item) => {

    dispatchBooks({
      type: 'REMOVE_BOOK',
      payload: item,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedBooks = books.data.filter((book) => 
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

        <strong>Search by title:</strong>
      </InputWithLabel>


      <hr />

      {books.isError && <p>Something went wrong, please try again...</p>}

      {books.isLoading ? (
        <p>Loading Library...</p>
      ) : (

        <List 
        list={searchedBooks} 
        onRemoveItem={handleRemoveBook} 
        />
      )}
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

const Item = ({ item, onRemoveItem }) => (
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
      <br />
        <button type="button" onClick={() => onRemoveItem(item)}>
          Remove
        </button>
      </span>
    </li>
  );

export default App;
