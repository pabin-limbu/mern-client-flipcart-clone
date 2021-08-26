import React from "react";

function Card(props) {
  return (
    <div className="card">
      {(props.headerLeft || props.headerRight) && (
        <div className="cardheader">
          {props.headerLeft && <div>{props.headerLeft}</div>}
          {props.headerRight && props.headerRight}
        </div>
      )}

      {props.children && props.children}
    </div>
  );
}

export default Card;
