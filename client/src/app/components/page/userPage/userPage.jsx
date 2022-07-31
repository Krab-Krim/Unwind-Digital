import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import {useSelector} from "react-redux";
import {getUserById} from "../../../store/users";

const UserPage = ({userId}) => {
    const user = useSelector(getUserById(userId));

    if (user) {
        return (
            <div className="container userPage">
                <div className="userPage-card">
                    <UserCard user={user}/>
                </div>
                <div>
                    <div>
                        <div className="mt-5">
                            <h3>Email:</h3>
                            <h5>{user.email}</h5>
                        </div>
                        <div className="mt-3">
                            <h3>Ваш пол:</h3>
                            <h5>{user.sex}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
