import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { useHistory } from "react-router-dom";
import {Image} from "react-bootstrap";
const UserCard = ({ user }) => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-danger btn-sm"
                        onClick={handleClick}
                    >
                        Изменить данные
                        <i className="bi bi-1-circle"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <Image
                        src={user.image}
                        className="rounded-circle"
                        width="150"
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
