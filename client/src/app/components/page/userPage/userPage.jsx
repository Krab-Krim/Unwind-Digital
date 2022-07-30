import React from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

    console.log("user", user)

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center position-relative">
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
