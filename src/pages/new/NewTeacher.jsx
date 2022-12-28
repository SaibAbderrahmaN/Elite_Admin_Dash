import React, { useEffect, useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addTeacher } from '../../actions';

const NewTeacher = ({title}) => {
    const [firstname, setFirstname] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [facebookUrl, setfacebookUrl] = useState("");
    const [twitterUrl, settwitterUrl] = useState("");
    const [instagramUrl, setinstagramUrl] = useState("");
    const [Linkedin, setLinkedin] = useState("");
    const [type, settype] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [teacherPicture, setTeacherPicture] = useState("");
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const Teachers = useSelector((state) => state.Teachers);
    const [Img, setImg] = useState('')
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();
    function  previewFile (file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setImg(reader.result)
    
        }
    
    
    
    }
      const submitProductForm = () => {
        const form = new FormData();
        form.append("firstName", firstname);
        form.append("lastName", LastName);
        form.append("type", type);
        form.append("description", description);
        form.append("email", Email);
        form.append("facebookUrl", facebookUrl);
        form.append("TwitterUrl  ", twitterUrl);
        form.append("instagramUrl", instagramUrl);
        form.append("linkedin", Linkedin);
        form.append("teacherPicture", Img);
    
        dispatch(addTeacher(form)).then(() => setShow(false));
      };
      const handleShow = () => setShow(true);
      const handleTeacherPictures = (e) => {
        setTeacherPicture(previewFile(e.target.files[0]));
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
            src={Img  ? Img  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={e=> e.preventDefault()}>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input type="file" id="file" name="productPicture" onChange={handleTeacherPictures} style={{ display: "none" }}/>
            </div>

              <div className="formInput" >
                <label>firstName</label>
                <input 
                     value={firstname}
                     placeholder={`firstName`}
                     onChange={(e) => setFirstname(e.target.value)}
                 />
              </div>
              <div className="formInput" >
                <label>LastName</label>
                <input 
                value={LastName} placeholder={`firstName`} onChange={(e) => setLastName(e.target.value)}
                  />
              </div>
              <div className="formInput" >
                <label>emil</label>
                <input 
                value={Email} placeholder={`email`} onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="formInput" >
                <label>Description</label>
                <input 
                value={description} placeholder={`Description`} onChange={(e) => setDescription(e.target.value)}
                  />
              </div>
          
              <div className="formInput" > 
              <label>facebookUrl</label>

                     <input    value={facebookUrl} placeholder={`facebook url`} onChange={(e) => setfacebookUrl(e.target.value)}  />
              </div>
              <div className="formInput" > 
              <label>twitterUrl</label>
            <input    value={twitterUrl}  placeholder={`Twitter Url`}  onChange={(e) => settwitterUrl(e.target.value)}/>

              </div>
              <div className="formInput" > 
              <label>instagramUrl</label>
              <input  value={instagramUrl} placeholder={`instagram Url`} onChange={(e) => setinstagramUrl(e.target.value)}/>

              </div>
              <div className="formInput" > 
              <label>linkedin</label>
              <input label="linkedin" value={Linkedin} placeholder={`linkedin url`} onChange={(e) => setLinkedin(e.target.value)}
/>

              </div>
              <div className="formInput" > 
              <label>category</label>
              <select  className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                 <option>select category</option> {createCategoryList(category.categories)?.map((option) => ( <option key={option.value} value={option.value}>   {option.name} </option>))}
               </select >
              </div>
            <button onClick={submitProductForm}>Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default NewTeacher


