import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Header() {

  const { user, firebase } = React.useContext(FirebaseContext)

  return (

    <div className="header">
      <div className="flex">
        <img src="/AirsoftLogo.jpg" alt="Logo" className="logo" />
        <NavLink to="/" className="header-title">
          Gun News
</NavLink>
        <NavLink to="/" className="header-link">
          News
</NavLink>
        <NavLink to="/top" className="header-link">
          Top Rated Gun Adverts
</NavLink>
        <NavLink to="/search" className="header-link">
          Search
</NavLink>
{user && (
  <>
        <NavLink to="/create" className="header-link">
          Submit
</NavLink>
</>
)}
      </div>
      <div className="flex">
        {user ? (
          <>
          <div className="header-name">Welcome! {user.displayName}</div>
          <NavLink to ="/profile" className="header-link" >My Profile</NavLink>
          <br/> 
          <div className="header-button" onClick={() => firebase.logout()}
          >logout</div>
          </>
        ) : (
          <NavLink to="/login" className="header-link">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Header);
