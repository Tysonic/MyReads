import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {get, getAll,update,search} from "./BooksAPI"
import ListBooks from "./ListBooks"
import Search from "./Search"


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
        {this.state.showSearchPage ? 
      <Search 
      searchBooks={() => this.setState({ showSearchPage: false })} 
  handleSearch={this.handleSearch}
  books={this.state.books}
  error={this.state.error}
  />
      : (
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
