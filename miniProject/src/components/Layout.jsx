import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* We add pt-16 to push content below the fixed navbar */}
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

export default Layout;