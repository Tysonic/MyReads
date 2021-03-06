import React from "react";
import { Shelves } from "./Constants";

const ShelfList = Shelves.map((item) => {
  return (
    <option key={item.key} disabled={item.disabled} value={item.key}>
      {item.value}
    </option>
  );
});
export default ShelfList;
