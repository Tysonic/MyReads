import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {get, getAll,update,search} from "./BooksAPI"
import ListBooks from "./ListBooks"

const WantToRead = "wantToRead";
const Read = "read";
const CurrentlyReading = "currentlyReading";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    showSearchPage: false
  }
  

  componentDidMount(){
    getAll()
    .then(data =>this.setState((prevState)=>{prevState.books=data}))
    .then(()=>console.log(this.state))
  }
  
  handleSearch = (event)=>{
    console.log(event.target.value)
    search(event.target.value,10)
    .then(data=>{this.setState((prevState)=>{if(data.error){prevState.error=data.error}else{prevState.books=data; prevState.error=undefined}})})
  }
  

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.handleSearch} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
				{ this.state.error ? <p>{this.state.error}</p> : <ol className="books-grid">
				{this.state.books.map(item=>{
 					return <li key={item.id}>{item.title}</li>
				})}
				</ol>}
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} shelf={CurrentlyReading}/>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} shelf={WantToRead}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   <ListBooks books={this.state.books} shelf={Read}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
