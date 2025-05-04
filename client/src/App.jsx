import React, { useEffect } from "react";
import Transactions from "./components/Transactions.jsx";
import io from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("connected to socket!");
    });

    socket.on("webhook", (data) => {
      console.log(data);
    });
  });

  return (
    <div className="app">
      <Transactions />
    </div>
  );
}

export default App;
