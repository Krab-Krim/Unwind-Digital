import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());

    if (!currentUser) return "loading";
    return (
        <div className="navProfile">
            <div className="navProfile-info">
                <div className="navProfile-info-name">{currentUser.name}</div>
                <div className="navProfile-info-img">
                    <img
                        src={currentUser.image}
                        alt=""
                        height="40"
                    />
                </div>
            </div>
            <div className="navProfile-link">
                <Link
                    to={`/users/${currentUser._id}`}
                >
                    Profile
                </Link>
                <Link
                    to="/logout"
                >
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
