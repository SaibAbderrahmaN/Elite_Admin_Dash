import axios from "../helpers/axios";
import { Teachers} from "../constants/constants";



const getTeachers = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: Teachers.GET_ALL_TEACHERS });
        const res = await axios.get(`allTeacher`);
        if (res.status === 200) {
          const { teachers } = res.data;
          dispatch({
            type: Teachers.GET_ALL_TEACHERS_SUCCESS,
            payload: { teachers },
          });
        } else {
          dispatch({ type: Teachers.GET_ALL_TEACHERS_FAILED });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

export const addTeacher = (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: Teachers.CREATE_TEACHER });
        const res = await axios.post(`createTeacher`, form);
        if (res.status === 201) {
          dispatch({ type: Teachers.CREATE_TEACHER_SUCCESS });
          dispatch(getTeachers());
        } else {
          dispatch({ type: Teachers.CREATE_TEACHER_FAILED });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


  export const deleteTeacherById = (TeacherId) => {
    return async (dispatch) => {
      try {
        const res = await axios.delete(`deleteTeacher`, {data: { TeacherId },});
        dispatch({ type: Teachers.DELETE_TEACHER });
        if (res.status === 202) {
          dispatch({ type: Teachers.DELETE_TEACHER_SUCCESS });
          dispatch(getTeachers());
        } else {
          const { error } = res.data;
          dispatch({
            type: Teachers.DELETE_TEACHER_FAILED,
            payload: { error,},
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };