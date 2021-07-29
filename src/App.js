import React from 'react'
import './App.css'
import { getAll,search} from "./BooksAPI"
import ListBooks from "./ListBooks"
import Search from "./Search"
import {WantToRead, Read,CurrentlyReading} from "./Constants"




class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
    showSearchPage: false,
    shelfVal:null
  }
  

  componentDidMount(){
    getAll()
    .then(data =>this.setState((prevState)=>{prevState.books=data}))
  }
  
  handleUpdate=(event)=>{
    this.state.showSearchPage ? this.handleSearch():
  getAll()
    .then(data =>this.setState((prevState)=>{prevState.books=data}))
  }
  handleSearch = (event)=>{
    event.target.value==="" ?
      getAll()
    .then(data =>this.setState((prevState)=>{prevState.books=data}))
    :
    search(event.target.value,20)
    .then(data=>{this.setState((prevState)=>{if(data.error){prevState.error=data.error}else{prevState.books=data; prevState.error=undefined}})})
  }
  

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? 
      <Search 
      searchBooks={() => this.setState({ showSearchPage: false })} 
  handleSearch={this.handleSearch}
  handleUpdate={this.handleUpdate}
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
                    <ListBooks books={this.state.books} shelf={CurrentlyReading} handleUpdate={this.handleUpdate}/>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books} shelf={WantToRead} handleUpdate={this.handleUpdate}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   <ListBooks books={this.state.books} shelf={Read} handleUpdate={this.handleUpdate}/>
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
