import React from "react"
import {Shelves} from "./Constants"

const ShelfList=Shelves.map(item=>{
return <option key={item.key} value={item.value}>{item.value}</option>
})
export default ShelfList;