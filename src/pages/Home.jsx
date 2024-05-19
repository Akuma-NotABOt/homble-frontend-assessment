import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h3> Welcome to Homble Frontend Assessment</h3>
      <p>Pages overview:</p>
      <ul>
        <li><Link to="/products">Product List Page</Link></li>
        <li><Link to="/dashboard">Product Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default Home;
