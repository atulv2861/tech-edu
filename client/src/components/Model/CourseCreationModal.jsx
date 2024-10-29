import React, { useState } from 'react';
import './CourseCreationModal.css';
import {createCourse} from "../../http/api.js"
const CourseCreationModal = ({ isOpen, onClose, afterCreateCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Array to hold base64 strings of images

  if (!isOpen) return null;

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + images.length > 3) {
      alert('You can only upload a maximum of 3 images.');
      return;
    }

    const base64ImagesPromises = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(base64ImagesPromises)
      .then((base64Images) => {
        setImages((prevImages) => [...prevImages, ...base64Images]);
      })
      .catch((error) => {
        console.error("Error reading files as Base64: ", error);
      });
  };

  const handleSubmit = async() => {
    if (!title || !description) {
      alert('Title and Description are required.');
      return;
    }
    if (images.length === 0 || images.length > 3) {
      alert('You must upload at least one image and a maximum of 3 images.');
      return;
    }

    const courseData = { title, description, images };
      const data = await  createCourse(courseData)
      if(data){
        setTitle("");
        setDescription("");
        setImages([]);
        afterCreateCourse();
        onClose();
      }
  };

  return (
    <div className="course-creation-modal-overlay" onClick={onClose}>
      <div className="course-creation-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create a New Course</h3>

        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter course title"
          className="course-creation-input"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter course description"
          className="course-creation-textarea"
        />

        <label>Images (Max 3)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="course-creation-file-input"
        />

        {images.length > 0 && (
          <div className="course-creation-image-preview">
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index + 1}`} className="course-creation-preview-img" />
            ))}
          </div>
        )}

        <button onClick={handleSubmit} className="course-creation-submit-button">Create Course</button>
        <button onClick={onClose} className="course-creation-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default CourseCreationModal;
