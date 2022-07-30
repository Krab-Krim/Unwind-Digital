import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import logo from "../../../statics/logo 3.png";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo}/>
                </div>
                <ul>
                    {isLoggedIn && (
                        <li>
                            <Link
                                aria-current="page"
                                to="/users"
                            >
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div>
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
