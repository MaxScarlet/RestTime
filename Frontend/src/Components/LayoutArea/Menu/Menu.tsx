import { useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";
import { isAuth } from "../../../Services/UserService";
import React, { ReactNode } from "react";
import { useAuth } from "../AuthProvider";

interface MenuProps {
  to?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MenuLink: React.FC<MenuProps> = ({
  to,
  children,
  onClick,
  className,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const linkClassName = isActive ? "active" : "";
  const navigate = useNavigate();
  const handleLinkClick = () => {
    if (onClick) {
      onClick();
    }

    navigate(to);
  };
  return (
    <div
      className={`${linkClassName} ${className || ""}`}
      onClick={handleLinkClick}
      style={{ cursor: "pointer" }} // Add cursor pointer for better UX
    >
      {children}
    </div>
  );
};

function Menu(menuProps: MenuProps): JSX.Element {
  const { token, logout } = useAuth();

  return (
    <div className="menu">
      <ul>
        <li>
          <MenuLink to="/home">Home</MenuLink>
        </li>
        <li> {token ? <MenuLink to="/list">List</MenuLink> : null}</li>
        <li>
          <MenuLink to="/about">About</MenuLink>
        </li>
        <li>
          {token ? (
            <>
              <li>
                <MenuLink to="/profile">Profile</MenuLink>
              </li>
              <li>
                <MenuLink onClick={logout}>Logout</MenuLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <MenuLink to="/signup">Sign Up</MenuLink>
              </li>
              <li>
                <MenuLink to="/login">Login</MenuLink>
              </li>
            </>
          )}
        </li>
      </ul>
      {/* {menuProps.isAuthenticated ? <MenuLink to="/list">List | </MenuLink> : null} */}
    </div>
  );
}

export default Menu;
