import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <hr />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
