import { NavLink } from "react-router-dom";
import "./Menu.css";
import { isAuth } from "../../../Services/UserService";

interface MenuProps {
  isAuthenticated: boolean;
  handleLogin: () => void;
}

function Menu(menuProps: MenuProps): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">Home | </NavLink>
      <NavLink to="/list">List | </NavLink>
      {/* {menuProps.isAuthenticated ? <NavLink to="/list">List | </NavLink> : null} */}
      <NavLink to="/insert">Insert</NavLink>
    </div>
  );
}

export default Menu;
