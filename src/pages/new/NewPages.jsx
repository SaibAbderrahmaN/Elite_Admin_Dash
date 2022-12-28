import React, { useEffect, useState } from 'react';
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import  RitchTextEditor from "../../RichTextEditor/RitchTextEditor";
import linearCategories from '../../helpers/linearCategories';
import { createPage} from '../../actions/index';



const NewPages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState()
    const [time, setTime] = useState()
    const [NumberOfPosts, setNumberOfPosts] = useState(0)
    const [DescriptionTwo, setDescriptionTwo] = useState('')
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const page = useSelector(state => state.page);
    const auth = useSelector(state => state.auth);
    const [Img, setImg] = useState('')
    const fullName = auth?.user?.firstName + " "+ auth?.user?.lastName || 'admin'



    const createCategoryList = (categories, options = []) => {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
      return options;
    };



    useEffect(() => {
      setCategories(linearCategories(category.categories));
  }, [category]);


  function  previewFile (file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
          setImg(reader.result)

      }
       }

  useEffect(() => {
      if(!page.loading){
          setTitle('');
          setCategoryId('');
          setDesc('');
          setTime()
          setNumberOfPosts()
          setBanners([]);
      }
  }, [page]);

  const onCategoryChange = (e) => {
      const category = categories.find(category => category.value === e.target.value);
      setCategoryId(e.target.value);
      setType(category.type);
  }

  const handleBannerImages = (e) => {
      setBanners(previewFile(e.target.files[0]));
  }
  const submitPageForm = (e) => {
      if(title === ""){
          alert('Title is required');          
          return;
      }
       
    const form = { title: title,'NumberOfPosts': NumberOfPosts,'price': price ,'time': time,'description': desc,
    'category': categoryId,'type': type , banners: Img , creator: fullName , DescriptionTwo:DescriptionTwo}

      dispatch(createPage(form)).then(()=>navigate('/pages'));
  }


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
            src={ Img   ? Img   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}alt=""
          />
        </div>
        <div className="right">
          <form onSubmit={e=> e.preventDefault()}>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input type="file" 
                   id="file" 
                     name="banners"
                     onChange={handleBannerImages}
                     style={{ display: "none" }}
                 
                    
                    
                    />
            </div>

              <div className="formInput" >
                <label>page Title</label>
                <input 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 placeholder={'Page Title'}
                 />
              </div>
              <div className="formInput" >
                <label>deadLine</label>
                <input 
                   value={time}
                   onChange={(e) => setTime(e.target.value)}
                   placeholder={'deadLine'}
                 
                  />
              </div>

              <div className="formInput" >
                <label>Number Of seats available</label>

                <input 
                 value={NumberOfPosts}
                 onChange={(e) => setNumberOfPosts(e.target.value)}
                 placeholder={'Number Of seats available'}
                  />
              </div>
              <div className="formInput" > 
                 <label>small description</label>

                 <input      
                   value={desc}
                   onChange={(e) => setDesc(e.target.value)}
                   placeholder={'Page Desc'}

                   />
              </div>
              <div style={{width:'100%'}} > 
              <label>big description</label>
              <RitchTextEditor setValue={setDescriptionTwo} />
              </div>
              
              <div className="formInput" > 
                 <label>price</label>

                 <input      
                 value={price}
                 onChange={(e) => setPrice(e.target.value)}
                 placeholder={'price'}

                   />
              </div>
              <div className="formInput" > 
              <label>Category</label>
              <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                     <option>select category</option> {createCategoryList(category.categories)?.map((option) => ( <option key={option.value} value={option.value}>   {option.name} </option>))}
                   </select >               </div>
            <a onClick={submitPageForm}>Send</a>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default NewPages