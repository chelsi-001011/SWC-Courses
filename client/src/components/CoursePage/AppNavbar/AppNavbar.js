import React, { useRef } from "react";
//import Logo from "../../Logo/Logo";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import styles from "./AppNavbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import leftArrow from "../../../images/left-arrow.png";
// import SearchPage from './SearchPage';

const AppNavbar = (props) => {
  const logoutHandler = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  
 
    return (
      <Navbar  className={styles.navbar}> 
      {/* // bg-transparent className="navbar navbar-expand-lg navbar-light  d-flex pt-4 px-4 bg " */}
        {/* <Logo /> */}
        <Link to="/">
              <button className={styles.BackButton}>
                <img src={leftArrow} alt="back" />
              </button>
            </Link>
            {/* <SearchPage /> */}
        <form
            className={styles.SearchForm}
            action="/courses/search"
            method="get"
          >
            <div className="input-group">
              <input
                style = {{width:850}}
                type="text"
                className="form-control"
                name="dsearch"
                placeholder="find courses"
              />
            </div>
          </form> 
        <Nav className={styles.Nav}>
          <NavItem>
            <Link to="/courses">
              <NavLink className={styles.NavLink}>Courses</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/logout">
              <NavLink className={styles.NavLink} onClick={logoutHandler}>
                Logout
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile/details">
              <NavLink className={styles.NavLink}>{props.name}</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">
              <NavLink>
                {/* <img src={avatar} alt="avatar" /> */}
                 <Avatar alt={props.name} src="#" /> 
          
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  
}

export default AppNavbar;
