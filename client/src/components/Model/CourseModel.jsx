// CourseModal.js
import React from 'react';
import './CourseModel.css';

const CourseModal = ({ isOpen, onClose, courseData }) => {
  if (!isOpen) return null;

  const { title, createdAt, description, images } = courseData;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="course-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p><strong>Created At:</strong> {formattedDate}</p>
        <p>{description}</p>
        {images && Array.isArray(images) && images.length > 0 && (
          <div className="images-container">
            {images.map((img, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img key={index} src={img} alt={`Course Image ${index + 1}`} className="modal-image" />
            ))}
          </div>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CourseModal;
