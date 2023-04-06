import React from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <h1>SUGAM.</h1>
          <div className="avtar">
            <Avatar style={{ background: "green" }}>S</Avatar>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
