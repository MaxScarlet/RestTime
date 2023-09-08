import React from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { AuthProvider } from "../AuthProvider";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <AuthProvider>
        <Menu to={""} children={undefined} />
        <hr />

        {/* <Header /> */}

        <Routing />
      </AuthProvider>
    </div>
  );
}

export default Layout;
