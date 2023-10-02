import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import List from "../../DataArea/List/List";
import Login from "../../DataArea/Login/Login";
import SignUp from "../../DataArea/SignUp/SignUp";
import About from "../../HomeArea/About/About";
import EditVacation from "../../HomeArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import Profile from "../../HomeArea/Profile/Profile";
import { useAuth } from "../AuthProvider";
import PageNotFound from "../PageNotFound/PageNotFound";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";
import Chart from "../../DataArea/Chart/Chart";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const token = useAuth().token;
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />; //Multiple children
};

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.isAdmin) {
    return true;
  } else {
    return false;
  }
}

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/vacation" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        {/* Liked vacations */}
        {isAdmin ? (
          <>
            <Route path="/vacation/:id/edit" element={<EditVacation />} />
            <Route path="/vacation/create" element={<EditVacation />} />
            <Route path="/chart" element={<Chart />} />
          </>
        ) : null}
      </Route>

      <Route path="/unauthorizedPage" element={<UnauthorizedPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routing;
