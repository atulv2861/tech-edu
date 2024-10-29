import axios from "axios";
import {
  successNotification,
  errorNotification,
} from "../components/ToastNotification/Notification";

const URL = "http://localhost:7000";
export const fetchAllCourses = async (page = 0) => {
  try {
    const { data } = await axios.get(
      `${URL}/course/getAllcourses?page=${page}`
    );    
    if (data?.success) {      
      return {
        courses: data.courses,
        totalCount: data.totalCount        ,
      };
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};

export const fetchSubscribedCourses = async (email, page) => {
  try {
    const { data } = await axios.get(
      `${URL}/course/getEnrollCourses?email=${email}&page=${page}`
    );
    if (data?.success) {      
      return {
        courses: data.courses,
        totalCount: data.totalCount,
      };
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};

export const enrollToCourse = async (_id, email) => {
  try {
    const { data } = await axios.post(`${URL}/course/enrollCourse`, {
      courseId: _id,
      userEmail: email,
    });
    if (data?.success) {
      successNotification(data.message);
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};

export const createCourse = async (courseData) => {
  try {
    const { data } = await axios.post(`${URL}/course/createCourse`,courseData);
    if (data?.success) {
      successNotification(data.message);
      return true;
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};

export const fetchCourseByID = async (courseId) => {
  try {
    const { data } = await axios.get(`${URL}/course/getCourseById/${courseId}`);
    if (data?.success) {      
      return data?.course;
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};
export const fetchSubscribedCourseByID = async (courseId, email) => {
  try {
    const { data } = await axios.get(
      `${URL}/course/getEnrolledCourseById?email=${email}&courseId=${courseId}`
    );
    if (data?.success) {      
      return data?.course;
    } else {
      errorNotification(data.message);
    }
  } catch (error) {
    errorNotification(error?.response?.data?.message);
  }
};
