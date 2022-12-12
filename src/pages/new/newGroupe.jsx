import React, { useEffect, useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch, useSelector } from 'react-redux';
import {addGroup, deleteGroupById} from '../../actions/groupe'
import { useNavigate } from "react-router-dom";
const NewGroupe = ({ inputs, title }) => {
    const category = useSelector((state) => state.category);
    const navigate = useNavigate();
    const Teachers = useSelector((state) => state?.Teachers?.Teachers);
    const [Students, setStudents] = useState([{ firstName:"",lastName:"",payment:null,phoneNumber:null}])
    const [name, setName] = useState('')
    const [Teacher, setTeacher] = useState("")
    const [day, setDay] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [numberSeatsAvailable, setNumberSeatsAvailable] = useState()
    const [numberSeats, setNumberSeats] = useState()
    const [type, setType] = useState("")
    const [categoryId, setCategoryId] = useState("");
    const [ description, setDescription] = useState("")
    const [file, setFile] = useState("");
    const dispatch = useDispatch();
    const createTeacherList = (Teachers, options = []) => {
      for (let teacher of Teachers) {
        options.push({ value: teacher._id, name: [teacher.firstName ,teacher.lastName ] });
      }
      return options;
    };
  
    const createCategoryList = (categories, options = []) => {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
      return options;
    };
    const submitGroupForm = () => {

      const form = {name,Students,Teacher,description,categoryId,start,end,numberSeatsAvailable,numberSeats,day}
  
     
        dispatch(addGroup(form)).then(() =>  navigate('/groupe'));
      };



  
    return (
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={ file   ? URL.createObjectURL(file)   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}alt=""
              />
            </div>
            <div className="right">
              <form onSubmit={e=> e.preventDefault()}>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }}/>
                </div>
  
                  <div className="formInput" >
                    <label>Group Title</label>
                    <input 
                     value={name}
                     placeholder={`Group Title`}
                     onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="formInput" >
                    <label>Description</label>
                    <input 
                      value={description}
                      placeholder={`Description`}
                      onChange={(e) => setDescription(e.target.value)}
                      />
                  </div>
                  <div className="formInput" >
                    <label>number seats available</label>
                    <input 
                       value={numberSeatsAvailable}
                       placeholder={`number seats available`}
                       onChange={(e) => setNumberSeatsAvailable(e.target.value)}
                      />
                  </div>
                  <div className="formInput" >
                    <label>price</label>
                    <input 
                     value={numberSeats}
                     placeholder={`Price per month`}
                     onChange={(e) => setNumberSeats(e.target.value)}
                      />
                  </div>
                  <div className="formInput" > 
                  <label>day</label>

                  <input label="day" value={day} placeholder={`write day of this group`} onChange={(e) => setDay(e.target.value)}      />
                  </div>
                  <div className="formInput" > 
                  <label>time to start</label>

                         <input    label="time to start"    value={start}    placeholder={`time to start`}    onChange={(e) => setStart(e.target.value)}  />
                  </div>
                  <div className="formInput" > 
                  <label>time to end</label>
                <input label="time to end" value={end} placeholder={`time to end`} onChange={(e) => setEnd(e.target.value)}/>

                  </div>
                  <div className="formInput" > 
                  <label>type</label>
                  <input label="type" value={type} placeholder={`type of this group`} onChange={(e) => setType(e.target.value)}/>

                  </div>
                  <div className="formInput" > 
                  <label>price</label>
                  <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                     <option>select category</option> {createCategoryList(category.categories)?.map((option) => ( <option key={option.value} value={option.value}>   {option.name} </option>))}
                   </select >
                  </div>
                  <div className="formInput" >
                  { Teachers?.length > 0 &&  <select style={{margin:"1rem 0",padding:'1rem'}} className="form-control" value={Teacher} onChange={(e) => setTeacher(e.target.value)}>
                   <option style={{padding:'2rem'}}>select Teacher</option> {createTeacherList(Teachers)?.map((option) => ( <option key={option.value} value={option.value}>   {option?.name[0]}  {option?.name[1]}</option>))}
                  </select>}                
                   </div>
                <button onClick={ submitGroupForm}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default NewGroupe