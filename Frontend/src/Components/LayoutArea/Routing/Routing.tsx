import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import List from "../../DataArea/List/List";
import Login from "../../DataArea/Login/Login";
import SignUp from "../../DataArea/SignUp/SignUp";
import About from "../../HomeArea/About/About";
import Home from "../../HomeArea/Home/Home";
import Profile from "../../HomeArea/Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";
import { useAuth } from "../AuthProvider";
import Favorites from "../../HomeArea/Favorites/Favorites";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const token = useAuth().token;
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />; //Multiple children
};

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/list" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        {/* Liked vacations */}
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
