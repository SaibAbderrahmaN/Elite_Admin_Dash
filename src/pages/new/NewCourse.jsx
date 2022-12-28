import React, { useEffect, useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../actions/index";
import  RitchTextEditor from "../../RichTextEditor/RitchTextEditor";


const NewCourse = ({ inputs, title }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const [Img, setImg] = useState([])
    const [file, setFile] = useState("");

    const dispatch = useDispatch(); 
    function  previewFile (file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
          setImg([...Img , reader.result])
  
      } }

    const submitProductForm = () => {
      const form = new FormData();
      form.append("name", name);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("description", description);
      form.append("category", categoryId);
      form.append("youtubeUrl", youtubeUrl);
      for (let pic of  Img) {
        form.append("productPicture", pic);
      }
        
        
    
        dispatch(addProduct(form)).then(() => navigate('/courses'));
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
    


    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, previewFile(e.target.files[0])]);
      };
    
  
  
  
    return (
    <div className="news">
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
              <input type="file" id="file" 
                    name="productPicture"
                    onChange={handleProductPictures} style={{ display: "none" }}/>
            </div>

              <div className="formInput" >
                <label>course Title</label>
                <input 
                 value={name}
                 placeholder={`course Name`}
                 onChange={(e) => setName(e.target.value)} 
                 />
              </div>
              <div className="formInput" >
                <label>number of students available</label>
                <input 
                  value={quantity}
                  placeholder={`number of students available`}
                  onChange={(e) => setQuantity(e.target.value)}
                  />
              </div>

              <div className="formInput" >
                <label>price</label>

                <input 
                    label="Price"
                    value={price}
                    placeholder={`Price por month`}
                    onChange={(e) => setPrice(e.target.value)}
                  />
              </div>
              <div style={{width:'100%'}} > 
              <label>description</label>
              <RitchTextEditor setValue={setDescription} />
              </div>
              <div className="formInput" > 
              <label>youtube url</label>

                     <input    label="time to start"   
                    
                   value={youtubeUrl}
                   placeholder={`youtubeUrl`}
                   onChange={(e) => setYoutubeUrl(e.target.value)}/>
              </div>
              <div className="formInput" > 
              <label>Category</label>
                     <select
                      className="form-control"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      >
                      <option>select category</option>
                      {createCategoryList(category.categories)?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                      </select>              
               </div>
            <a onClick={submitProductForm}>Send</a>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default NewCourse