import React, { useState, useEffect } from "react";
import "./Transactions.css";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);

  const getTransactions = async (path = "/transactions") => {
    const url = `http://localhost:5000${path}`;
    const { data } = await axios.get(url);
    console.log(data);
    setTransactions(data);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handlePagedTransactions = (e) => {
    const { url } = e.currentTarget.dataset;
    if (url) {
      setTransactions(null);
      getTransactions(url);
    }
  };

  const renderTransaction = (transaction) => (
    <li key={transaction.id} className="item">
      <span>{transaction.attributes.description}</span>
      <span>{transaction.attributes.amount.value}</span>
    </li>
  );

  return transactions ? (
    <div className="container">
      <h1>Transactions</h1>
      <ul className="list">{transactions.data.map(renderTransaction)}</ul>
      <div className="buttons">
        <button
          className={transactions.links.prev ? "" : "disabled"}
          onClick={handlePagedTransactions}
          data-url={transactions.links.prev}
        >
          Previous
        </button>
        <button
          className={transactions.links.next ? "" : "disabled"}
          onClick={handlePagedTransactions}
          data-url={transactions.links.next}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <h1 className="loading">Loading...</h1>
  );
};

export default Transactions;
