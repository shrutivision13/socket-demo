import React from "react";
import HigherOrder from "./higherOrder";

const UseHigherOrder = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      console.log("🚀 ~ extends ~ render ~ this.props:", this.props);
      return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default UseHigherOrder;
