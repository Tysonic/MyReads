import React from "react"

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
				{ props.error ? <p>{props.error}</p> : <ol className="books-grid">
				{props.books.map(item=>{
 					return <li key={item.id}>{item.title}</li>
				})}
				</ol>}
            </div>
          </div>
)
}

export default Search