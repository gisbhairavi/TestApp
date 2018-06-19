import React from 'react';

import Dashboard from 'views/Dashboard/Dashboard';
import Login from 'views/Login/Login';
import Register from 'views/Register/Register';
import UserManagement from 'views/UserManagement/User';
const routes = {
    profile : ()=><div>Profile!</div>,
    settings : ()=><div>Settings!</div>,
    access : ()=> <div>Access!</div>
}
const appRoutes = [
    {path: "/", name: "Dashboard", component: Dashboard},
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
    {path : "/profile" , name :"Profile", component:routes.profile, authenticate : true},
    {path : "/settings" , name :"settings", component:routes.settings, authenticate : true},
    {path : "/access" , name :"access", component:routes.access},
    {path : "/userManagement", name:"userManagement", component :UserManagement}

];

export default appRoutes;
