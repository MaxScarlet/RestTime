import { Navigate, Route, Routes } from "react-router-dom";
import List from "../../DataArea/List/List";
import Login from "../../DataArea/Login/Login";
import SignUp from "../../DataArea/SignUp/SignUp";
import About from "../../HomeArea/About/About";
import Home from "../../HomeArea/Home/Home";
import Profile from "../../HomeArea/Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../AuthProvider";

function Routing(): JSX.Element {
  //   function AuthenticatedRoute({ element }) {
  //     const isAuthenticated = isAuth(); // Replace with your actual authentication logic
  //     setIsAuthenticated(isAuth());
  //     return isAuthenticated ? element : <Navigate to="/UnauthorizedPage" />;
  //   }
  const token = useAuth().token;

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* <Route path="/list" element={<List />} /> */}
      <Route path="/list" element={<List />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />

      {/* Liked vacations */}
      {/* <Route path="/favorites" element={<Favorites />} /> */}

      {/* <ProtectedRoute
        path="/profile"
        element={<Profile />}
        isAuthenticated={token !== null}
      /> */}
      
      <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
