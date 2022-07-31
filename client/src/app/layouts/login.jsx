import React, {useState} from "react";
import {useParams} from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const {type} = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container login">
            <div className="login-row">
                <div className="login-form">
                    {formType === "register" ? (
                        <div>
                            <h1 className="login-text-h1">Регистрация</h1>
                            <RegisterForm/>
                            <div className="login-text">
                                <p>
                                    Уже есть аккаунт?{" "}
                                    <a
                                        role="button"
                                        onClick={toggleFormType}
                                    >
                                        {" "}
                                        Вход в личный кабинет
                                    </a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1 className="login-text-h1">Autorization</h1>
                            <LoginForm/>
                            <div className="login-text">
                                <p>
                                    У вас нет аккаунта? {" "}
                                    <a
                                        role="button"
                                        onClick={toggleFormType}
                                    >
                                        {" "}
                                        Регистрация
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Login;
