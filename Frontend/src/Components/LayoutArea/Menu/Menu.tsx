import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "./Menu.css";

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
  const { token, logout ,isAdmin} = useAuth();

//   function isAdmin() {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user.isAdmin) {
//       return true;
//     } else {
//       return false;
//     }
//   }

  return (
    <div className="menu">
      <div className="menuItems">
        <MenuLink className="menuItem" to="/home">
          Home
        </MenuLink>

        {token ? (
          <MenuLink className="menuItem" to="/vacation">
            Vacations
          </MenuLink>
        ) : null}

        <MenuLink className="menuItem" to="/about">
          About
        </MenuLink>

        <div className="menuUser">
          {token ? (
            //Wrap in JSX fragment
            <>
              {isAdmin() ? (
                <MenuLink className="menuUserItem" to="/vacation/create">
                  Create Vacation
                </MenuLink>
              ) : (
                <MenuLink className="menuUserItem" to="/favorites">
                  My Favorites
                </MenuLink>
              )}
              <MenuLink className="menuUserItem" to="/profile">
                Profile
              </MenuLink>
              <MenuLink className="menuUserItem" onClick={logout}>
                Logout
              </MenuLink>
            </>
          ) : (
            //Wrap in JSX fragment
            <>
              <MenuLink className="menuUserItem" to="/signup">
                Sign Up
              </MenuLink>
              <MenuLink className="menuUserItem" to="/login">
                Login
              </MenuLink>
            </>
          )}
        </div>
      </div>
      {/* {menuProps.isAuthenticated ? <MenuLink to="/list">List | </MenuLink> : null} */}
    </div>
  );
}

export default Menu;
