import React from "react";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";
import { Shelves } from "./Constants";

const Books = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Shelves.slice(1, 4).map((e) => {
    				
            return (
              <div key={e.key} className="bookshelf">
                <h2 className="bookshelf-title">{e.value}</h2>
                <div className="bookshelf-books">
                  <ListBooks
                    books={props.books}
                    shelf={e.key}
                    handleUpdate={props.handleUpdate}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Books;
