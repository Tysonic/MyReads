import React from "react"
import ShelfList from "./ShelfList"
import {update} from "./BooksAPI"

const Search =(props)=>{

return (
 <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={props.searchBooks}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={props.handleSearch} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
				{ props.error ? 
                 <p>{props.error}</p> 
: 
					<ol className="books-grid">
				{props.books.map(e=>{
 					return(
                 <li key={e.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 														`url("${e.imageLinks.thumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select value={e.shelf} onChange={(event)=>update(e,event.target.value)
								.then(()=>props.handleUpdate())
								}>
                                <option value="move" disabled>Move to...</option>
                                {ShelfList}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{e.title}</div>
                          <div className="book-authors">{e.author}</div>
                        </div>
                      </li>)
				})}
				</ol>}
            </div>
          </div>
)
}

export default Search