import { io } from "socket.io-client";
console.log(process.env.REACT_APP_SOCKET_URL);
export const socket = io(process.env.REACT_APP_SOCKET_URL, {
    auth: {
        token: localStorage.getItem("token")
    }
});