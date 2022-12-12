import authReducer from './auth.reducers';
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer';
import TeacherReducer from './Teacher.reducers';
import GroupsReducer from './Groups.reducers';






const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer,
    Teachers: TeacherReducer,
    Groups: GroupsReducer,
});

export default rootReducer;