import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewGroupe from "./pages/new/newGroupe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData } from './actions/index';
import  Groups  from "./pages/Groups/Groups.jsx";
import Category from "./pages/Category/Category";
import Course from "./pages/Course/Course";
import NewCourse  from './pages/new/NewCourse'
import Orders from './pages/Orders/Orders.jsx'


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    

  }, [auth.authenticate]);

  const token = window.localStorage.getItem('token');


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path="courses">
              <Route index element={<Course />} />
              <Route path="new"element={<NewCourse inputs={productInputs} title="Add New courses" />}/>
            </Route>


            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new"element={<New inputs={productInputs} title="Add New Product" />}/>
            </Route>
            <Route path="category">
              <Route index element={<Category />} />
            </Route>
            <Route path="groupe">
              <Route index element={<Groups />} />
              <Route path="new"element={<NewGroupe inputs={productInputs} title="Add New Product" />}/>

            </Route>
            <Route path="orders">
              <Route index element={<Orders />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
