import { useEffect, useState } from "react";
import io from "socket.io-client";

// useSocket.js

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("YOUR_SOCKET_SERVER_URL");
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const socketEmit = (eventName, data) => {
    socket.emit(eventName, data);
  };

  const socketOn = (eventName, callback) => {
    socket.on(eventName, (data) => {
      if (data?.status === 200) callback(data);
      else {
        toast.error(data?.error);
      }
    });
  };

  return { socketEmit, socketOn };
};

export default useSocket;
