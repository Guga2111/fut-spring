import React from "react";
import "./styles.css";
import ProfileImage from "./ProfileImage";

export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <a href="/">
          <img
            src="futspringlogo.png"
            alt="FutSpring Logo"
            className="app-subtitle"
          ></img>
        </a>
        <ProfileImage></ProfileImage>
      </div>
    </div>
  );
}
