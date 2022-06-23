import React from "react";
import {NavLink} from "react-router-dom";

class loginNav extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <>
                <div className="pageSwitcher">
                <NavLink
                    to="/login/sign-in"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                >
                    Sign In
                </NavLink>
                <NavLink
                    exact
                    to="/login"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                >
                    Sign Up
                </NavLink>
                </div>

                <div className="formTitle">
                <NavLink
                    to="/login/sign-in"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                >
                    Sign In
                </NavLink>{" "}
                or{" "}
                <NavLink
                    exact
                    to="/login"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                >
                    Sign Up
                </NavLink>
                </div>
            </>
        )
    }
}

export default loginNav;