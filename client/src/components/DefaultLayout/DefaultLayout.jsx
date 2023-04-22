import React from "react";
import "./defaultLayout.css";

const DefaultLayout = (props) => {
  return (
    <>
      <div>
        <div className="header bs1">
          <div className="d-flex justify-content-between">
            <h1>Rent a Vehicle</h1>
          </div>
        </div>
        <div className="content"></div>
      </div>
    </>
  );
};

export default DefaultLayout;
