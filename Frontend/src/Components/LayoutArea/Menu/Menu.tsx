/* eslint-disable react/jsx-no-target-blank */
import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "./Menu.css";
import image from "../../../Icon/swagger-icon.png";
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
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

function Menu(menuProps: MenuProps): JSX.Element {
  const { token, logout, isAdmin } = useAuth();

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
              <a
                target="_blank"
                className="menuItem"
                href="http://localhost:4040/api-docs/#/"
              >
                <img src={image} alt="Swagger" title="Swagger" />
              </a>
              {isAdmin() ? (
                <MenuLink className="menuUserItem " to="/vacation/create">
                  Vacation
                </MenuLink>
              ) : null}
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
