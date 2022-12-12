import { Teachers } from "../constants/constants";

const initialState = {
    Teachers: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case Teachers.GET_ALL_TEACHERS_SUCCESS:
            state = {
                ...state,
                Teachers: action.payload.teachers
            }
            break;
    }

    return state;
}