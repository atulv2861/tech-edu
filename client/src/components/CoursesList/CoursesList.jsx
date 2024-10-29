import React, { useState, useEffect } from 'react';
import CourseCard from '../Card/CourseCard';
import './CoursesList.css'; // Import the custom CSS file

const CoursesList = ({ allCourses,email, getAllCourses,handleEnrollToCourse,fetchEnrollCourse,setPage,page }) => {
  
  const pageSize = 4;

  const nextPage = () =>{
    setPage((prevPage) => {
        const newPage = prevPage + 1;
        getAllCourses(newPage);         
        return newPage;          
      }); 
  };
  const prevPage = () =>{
    setPage((prevPage) => {
       const newPage = Math.max(prevPage - 1, 0)
       getAllCourses(newPage);         
        return newPage;   

    });
  }  

  return (
    <div className="courses-list-container">
      <div className="courses-grid">
        {allCourses?.courses && Array.isArray(allCourses.courses) && allCourses.courses.map((course, index) => (
          <CourseCard key={index} course={course} email={email} handleEnrollToCourse={handleEnrollToCourse} fetchEnrollCourse={fetchEnrollCourse} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={()=>prevPage()} disabled={page === 0} className="pagination-button">
          Previous
        </button>
        <span className="page-info">{page + 1}</span>
        <button onClick={()=>nextPage()} disabled={allCourses?.totalCount <= pageSize*(page+1)} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default CoursesList;
