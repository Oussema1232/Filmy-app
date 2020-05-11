import React from "react";

const Like = (props) => {
  const filled = props.liked;
  return (
    <i
      style={{ cursor: "pointer" }}
      className={filled ? "fa fa-heart" : "fa fa-heart-o"}
      onClick={props.likemovie}
    ></i>
  );
};

export default Like;
