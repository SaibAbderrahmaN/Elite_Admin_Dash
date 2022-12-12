import axios from "../helpers/axios";
import {  GroupConstants  } from "../constants/constants";

// new action
const getGroups = () => {
  return async (dispatch) => {
    try {
      dispatch({ type:  GroupConstants.GET_ALL_GROUPS });
      const res = await axios.get(`groups`);
      if (res.status === 200) {
        const { groups } = res.data;
        dispatch({
          type: GroupConstants.GET_ALL_GROUPS_SUCCESS,
          payload: { groups },
        });
      } else {
        dispatch({ type: GroupConstants.GET_ALL_GROUPS_FAILED });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addGroup = (form) => {
  return async (dispatch) => {
    try {
        dispatch({type: GroupConstants.CREATE_GROUP_REQUEST})
      const res = await axios.post(`group/create`, form);
      if (res.status === 201) {
        dispatch({ type: GroupConstants.CREATE_GROUP_SUCCESS });
        dispatch(getGroups());
      } else {
        dispatch({ type: GroupConstants.CREATE_GROUP_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const deleteGroupById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`group/delete`, {
        data: { payload },
      });
      dispatch({ type: GroupConstants.DELETE_GROUP_REQUEST });
      if (res.status === 201) {
        dispatch({ type: GroupConstants.DELETE_GROUP_SUCCESS });
        dispatch(getGroups());
      } else {
        const { error } = res.data;
        dispatch({
          type: GroupConstants.DELETE_GROUP_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};