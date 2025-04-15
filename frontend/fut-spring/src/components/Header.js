import React from "react";
import "./styles.css";
import ProfileImage from "./ProfileImage";

export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h2 className="app-subtitle">FutSpring</h2>
        <ProfileImage></ProfileImage>
      </div>
    </div>
  );
}
