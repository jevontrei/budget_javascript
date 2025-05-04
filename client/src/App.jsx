import { useState } from "react";
import Transactions from "./components/Transactions.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Transactions />
    </div>
  );
}

export default App;
