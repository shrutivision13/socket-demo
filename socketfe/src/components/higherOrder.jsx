import axios from "axios";
import React, { useEffect, useRef } from "react";
import Modal from "./modalComponent";

const HigherOrder = (props) => {
  console.log("🚀 ~ HigherOrder ~ props:", props);
  const modalRef = useRef();
  console.log("🚀 ~ HigherOrder ~ modalRef:", modalRef);
  useEffect(() => {
    getUsers();
    props.socket.emit("client:employees", {
      message: "hello",
    });
  }, []);

  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log("🚀 ~ getUsers ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ getUsers ~ err:", err);
      });
  };

  return (
    <div>
      HigherOrder :{props?.name}
      <Modal open={true}></Modal>
      <button onClick={() => getUsers()}>Submit</button>
    </div>
  );
};

export default HigherOrder;
