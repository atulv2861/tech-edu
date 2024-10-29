import React from 'react';
import './header.css';

const Header = ({ email, handleCourseToggle, fetchEnrollCourse }) => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <div style={{maxWith:"10vw"}}>
        EdTech  <br/>
        <span className="guest-user" style={{color:email?"white":"red"}}>Email-verify:{email?"true":"false"}</span>
        </div>
        
        <div className="button-group">
          <button 
            className={`course-button ${!fetchEnrollCourse ? 'active' : ''}`} 
            onClick={() => handleCourseToggle(true)}
          >
            All Courses
          </button>
          <button 
            className={`course-button ${fetchEnrollCourse ? 'active' : ''}`} 
            onClick={() => handleCourseToggle(false)}
          >
            Enrolled Courses
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
