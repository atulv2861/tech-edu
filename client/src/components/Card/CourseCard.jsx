import React, { useState ,useRef} from 'react';
import CourseModel from '../Model/CourseModel.jsx';
import './CourseCard.css';
import {fetchCourseByID,fetchSubscribedCourseByID} from "../../http/api.js"
const CourseCard = ({ course,email,handleEnrollToCourse,fetchEnrollCourse }) => {
  const { title, createdAt,images, description, _id } = course;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courseData = useRef(null);

  const openModal = async() => {
    const data = fetchEnrollCourse ? await fetchCourseByID(_id):await fetchSubscribedCourseByID(_id,email)
    if(data){
      courseData.current = data
      setIsModalOpen(true)
    }
     
};
  const closeModal = () => setIsModalOpen(false);
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  return (
    <div className="course-card">
      <img src={images} alt="Course Image" className="course-image" />
      <div className="course-content">
        <h3>{title?.slice(0, 17)}{title?.length > 17 ? '...' : ''}</h3>
        <p><strong>Created At:</strong> {formattedDate}</p>
        <p><strong>Description:</strong>{description?.slice(0, 100)}{description?.length > 100 ? '...' : ''}</p>
        <button className='view-details-btn' onClick={openModal}>View Details</button>
        {fetchEnrollCourse && <button onClick={()=>handleEnrollToCourse(_id)}>Enroll Now</button>}
      </div>
      {isModalOpen&&<CourseModel isOpen={isModalOpen} onClose={closeModal} courseData={courseData?.current} />}
    </div>
  );
};

export default CourseCard;
