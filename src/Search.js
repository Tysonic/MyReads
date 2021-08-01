import React from "react";
import { Link } from "react-router-dom";
import BookDisplay from "./BookDisplay";
import { search } from "./BooksAPI";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch = (event) => {
    event.target.value === ""
      ? 
          this.setState((prevState) => {
            prevState.books = [];
          })
      : search(event.target.value, 20).then((data) => {
          this.setState((prevState) => {
            if (data.error) {
              prevState.error = data.error;
            } else {
              prevState.error = undefined;
              prevState.books = data;              
            }
          });
        });
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              onChange={this.handleSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.error ? (
            <p>{this.state.error}</p>
          ) : (
            <ol className="books-grid">
              {this.state.books.map((e,index) => {
                return (
                  <BookDisplay key={index} e={e} shelf={e.key} handleUpdate={this.props.handleUpdate} />
                );
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
