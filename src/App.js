import React from 'react'
import './App.css'
import { getAll,search} from "./BooksAPI"
import Search from "./Search"
import {Route,Redirect} from "react-router-dom"
import Books from "./Books"



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
        <Route path="/add" 
      render={
      ()=>
    (
      <Search 
      searchBooks={() => this.setState({ showSearchPage: false })} 
  handleSearch={this.handleSearch}
  handleUpdate={this.handleUpdate}
  books={this.state.books}
  error={this.state.error}
  />)}/>

      <Route path="/list" render={()=>(
          <Books 
        handleUpdate={this.handleUpdate}
		handleInputChange={this.handleInputChange}
		books={this.state.books}
        />
        )}/>
<Redirect exact from="/" to="/list"/>
      </div>
    )
  }
}

export default BooksApp
