import { GroupConstants } from "../constants/constants"

const initState = {
    error: null,
    loading: false,
    groups: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case GroupConstants.GET_ALL_GROUPS_SUCCESS:
            state = {
                ...state,
                groups: action.payload.Groups
            }
            break;
        case GroupConstants.CREATE_GROUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case GroupConstants.CREATE_GROUP_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case GroupConstants.CREATE_GROUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
     }