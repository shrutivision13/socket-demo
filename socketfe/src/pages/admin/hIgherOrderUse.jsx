import React from "react";
import HigherOrder from "../../components/higherOrder";
import UseHigherOrder from "../../components/useHigherOrder";

const HigherOrderUse = ({ socket }) => {
  const EnhancedComponent = UseHigherOrder(HigherOrder);

  return (
    <div>
      <UseHigherOrder />
      <EnhancedComponent name="shruti" socket={socket} />
      <EnhancedComponent name="shivani" socket={socket} />
    </div>
  );
};

export default HigherOrderUse;
