import React from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            
            <Menu isAuthenticated={false} handleLogin={function (): void {
                throw new Error("Function not implemented.");
            } } />
            <hr />

			<Header />

            <Routing />
            
        </div>
    );
}

export default Layout;
