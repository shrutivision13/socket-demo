import React from "react";

export const CartContext = React.createContext({
  count: 0,
  setCount: () => {},
});
