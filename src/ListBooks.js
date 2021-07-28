import React from "react"


const ListBooks=(props)=>{

    return(
      <ol className="books-grid">
      {
      props.books.filter(e=>e.shelf===props.shelf).map(e=>{
        return (
        <li key={e.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 														`url("${e.imageLinks.thumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{e.title}</div>
                          <div className="book-authors">{e.author}</div>
                        </div>
                      </li>
        )}
        
        )
      }
      </ol>
    )
  }

export default ListBooks