import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar/>
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/" exact exactly component={Main}/>
                    <Route path="/login/:type?" exactly component={Login}/>
                    <Route path="/logout" component={LogOut}/>
                </Switch>
            </AppLoader>
            <ToastContainer/>
        </div>
    );
}

export default App;
