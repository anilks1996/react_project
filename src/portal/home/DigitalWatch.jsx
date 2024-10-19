import React, { useState, useEffect } from "react";

const DigitalWatch = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div
      className="col-md-3"
      style={{
        // border: "3px solid grey",
        color: "red",
        // background: "",
        height: "40px",
        width: "230px",
        // borderRadius: "10px",
        marginTop: "10px",
        fontFamily: "sans-serif",
        paddingTop: "0px",
        fontSize: "4px",
        display: "flex",
      }}
    >
      <h2>{ctime}</h2>
    </div>
  );
};

export default DigitalWatch;
