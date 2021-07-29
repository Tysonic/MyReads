import React from "react"
import {update} from "./BooksAPI"
import ShelfList from "./ShelfList"


class ListBooks extends React.Component{
  constructor(props){
  super(props)
    this.state = {}
    this.handleShelf = this.handleShelf.bind(this)
  }
  
 handleShelf=()=>{
   
    
  }
render(){
    return(
      <ol className="books-grid">
      {
      this.props.books.filter(e=>e.shelf===this.props.shelf).map(e=>{
        return (
        <li key={e.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 														`url("${e.imageLinks.thumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select value={e.shelf} onChange={(event)=>update(e,event.target.value)
								.then(()=>this.props.handleUpdate())
								}>
                                <option value="move" disabled>Move to...</option>
										{ShelfList}
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
  }

export default ListBooks