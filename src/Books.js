import React from "react"
import ListBooks from "./ListBooks"
import {Link} from "react-router-dom"
import {WantToRead, Read,CurrentlyReading} from "./Constants"

const Books =(props)=>{
  return(<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={props.books} shelf={CurrentlyReading} handleUpdate={props.handleUpdate}/>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={props.books} shelf={WantToRead} handleUpdate={props.handleUpdate}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                   <ListBooks books={props.books} shelf={Read} handleUpdate={props.handleUpdate}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/add">Add a book</Link>
            </div>
          </div>)}

export default Books;