import React from "react";

import Header from "../Header";
import MenuHeader from "../MenuHeader";

function Layout(props) {
  return (
    <>
      <Header></Header>
      <MenuHeader></MenuHeader>
      {props.children}
    </>
  );
}

export default Layout;
