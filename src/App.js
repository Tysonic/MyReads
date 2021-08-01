import React from "react";
import "./App.css";
import { getAll} from "./BooksAPI";
import Search from "./Search";
import { Route } from "react-router-dom";
import Books from "./Books";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
    shelfVal: null,
  };

  componentDidMount() {
    getAll().then((data) =>
      this.setState((prevState) => {
        prevState.books = data;
      })
    );
  }

  handleUpdate = (event) => {
    this.state.showSearchPage
      ? this.handleSearch()
      : getAll().then((data) =>
          this.setState((prevState) => {
            prevState.books = data;
          })
        );
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              searchBooks={() => this.setState({ showSearchPage: false })}
              handleUpdate={this.handleUpdate}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Books
              handleUpdate={this.handleUpdate}
              handleInputChange={this.handleInputChange}
              books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
