import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    return (
        <div className="userCard">
            <div>
                {currentUser._id === user._id && (
                    <button
                        onClick={handleClick}
                    >
                        Изменить данные
                        <i className="bi bi-1-circle"></i>
                    </button>
                )}

                <div>
                    <img
                        src={user.image}
                        width="150"
                        alt="img"
                    />
                    <div className="mt-4">
                        <h4>{user.name}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
