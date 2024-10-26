import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTasks,
  faList,
  faCog,
  faSignOutAlt,
  faInfoCircle,
  faExclamationCircle,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isSignedIn, setIsSignedIn, name, email }) => {
  return (
    <div className="sidebar">
      {isSignedIn ? (
        <>
          <div className="profile-section">
            <h3>{name}</h3>
            <p>{email}</p>
          </div>
          <nav>
            <ul>
              <li>
                <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                Dashboard
              </li>
              <li>
                <FontAwesomeIcon icon={faExclamationCircle} className="icon" />
                Vital Task
              </li>
              <li>
                <FontAwesomeIcon icon={faTasks} className="icon" />
                My Task
              </li>
              <li>
                <FontAwesomeIcon icon={faList} className="icon" />
                Task Categories
              </li>
              <li>
                <FontAwesomeIcon icon={faCog} className="icon" />
                Settings
              </li>
              <li>
                <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                Help
              </li>
            </ul>
          </nav>
          <div className="logout-section" onClick={() => setIsSignedIn(false)}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            Logout
          </div>
        </>
      ) : (
        <div className="auth-section">
          <h3>Welcome!</h3>
          <p>Please sign in to access your dashboard.</p>
          <ul>
            <li onClick={() => setIsSignedIn(true)} id="login_button">
              <FontAwesomeIcon icon={faSignInAlt} className="icon" />
              Login
            </li>
            <li>
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              Register
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;