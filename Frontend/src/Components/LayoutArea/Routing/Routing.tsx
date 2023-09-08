import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/Insert";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import { isAuth } from "../../../Services/UserService";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";
import { useState } from "react";
import Menu from "../Menu/Menu";
import React from "react";

function Routing(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    // Perform login logic here, and when successful, set isAuthenticated to true
    setIsAuthenticated(true);
  };

//   function AuthenticatedRoute({ element }) {
//     const isAuthenticated = isAuth(); // Replace with your actual authentication logic
//     setIsAuthenticated(isAuth());
//     return isAuthenticated ? element : <Navigate to="/UnauthorizedPage" />;
//   }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* <Route path="/list" element={<List />} /> */}
      <Route path="/list" element={<List />} />
      <Route path="/insert" element={<Insert />} />
      <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
