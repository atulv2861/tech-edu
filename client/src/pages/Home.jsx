import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import EmailInputModal from "../components/Model/EmailInputModal";
import {fetchAllCourses,fetchSubscribedCourses,enrollToCourse} from '../http/api.js'
import CoursesList from "../components/CoursesList/CoursesList";
import CourseCreationModal from "../components/Model/CourseCreationModal.jsx";

const Home = () => {
  const [email, setEmail] = useState(null);
  const [fetchEnrollCourse, setFetcEnrollCourse] = useState(true);
  const [courses, coursesData] = useState(false);
  const [createCourse, setCreateCourse] = useState();
  const [page, setPage] = useState(0);
  const getcourses = async(page =0)=>{
       const data = await fetchAllCourses(page);       
       if(data){
        coursesData(data)
       }
  }
 
  const getsubscribedCourse = async (page = 0) => {
     const data = await fetchSubscribedCourses(email,page)
     if (data) {
      coursesData(data)
     }
  };
  useEffect(() => {
    if (fetchEnrollCourse) {
      getcourses(0);
    } else {
      getsubscribedCourse(0);
    }
    setPage(0);
  }, [fetchEnrollCourse]);

  const handleCourseToggle = (val) => {
    setFetcEnrollCourse(val);
  };

  const handlePageChnage = (page) => {
    if (fetchEnrollCourse) {
      getcourses(page);
    } else {
      getsubscribedCourse(page);
    }
  };

  const handleEnrollToCourse = async (_id) => {
      enrollToCourse(_id,email)
  };

  return (
    <>
      <Header
        email={email}
        handleCourseToggle={handleCourseToggle}
        fetchEnrollCourse={fetchEnrollCourse}
      />
      {!email && <EmailInputModal setEmail={setEmail} />}
      {courses?.courses &&
      Array.isArray(courses.courses) &&
      courses.courses.length > 0 ? (
        <CoursesList
          getAllCourses={handlePageChnage}
          allCourses={courses}
          email={email}
          handleEnrollToCourse={handleEnrollToCourse}
          fetchEnrollCourse={fetchEnrollCourse}
          setPage={setPage}
          page={page}
        />
      ) : (
        <div>No course found!!!</div>
      )}
     { fetchEnrollCourse && <button
        style={{
          position: "fixed",
          bottom: "10vh",
          right: "4vw",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setCreateCourse(true)}
      >
        +
      </button>
      }
      <CourseCreationModal
        isOpen={createCourse}
        onClose={() => setCreateCourse(false)}
        afterCreateCourse={() => getcourses()}
      />
    </>
  );
};

export default Home;
