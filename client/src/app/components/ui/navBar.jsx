import React from "react";
import {Link} from "react-router-dom";
import NavProfile from "./navProfile";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../store/users";
import logo from "../../../statics/logo 3.png";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="nav">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={logo} alt="logo"/>
                    <div className="nav-logo-page">
                        <div className="nav-logo-user">
                            {isLoggedIn && (
                                <div className="nav-logo-user-text">
                                    <Link
                                        aria-current="page"
                                        to="/users"
                                    >
                                        Users
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="nav-logo-profile">
                            {isLoggedIn ? (
                                <NavProfile/>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
