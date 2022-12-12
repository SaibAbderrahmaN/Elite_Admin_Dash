import {
    initialDataConstants,
    categoryConstansts,
    productConstants,
    orderConstants,
    Teachers,
    pageConstants,
    GroupConstants

  } from "../constants/constants.js";
  import axios from "../helpers/axios";
  
  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/initialData`);
      if (res.status === 200) {
        const { categories, products, orders , teachers ,pages, Groups} = res.data;
        dispatch({
          type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
        dispatch({
          type: Teachers.GET_ALL_TEACHERS_SUCCESS,
          payload: { teachers },
        });
        dispatch({
          type: pageConstants.GET_ALL_PAGES_SUCCESS,
          payload: {pages },
        });
        dispatch({
          type: GroupConstants.GET_ALL_GROUPS_SUCCESS,
          payload: { Groups },
        });
      }
      console.log(res);
    };
  };