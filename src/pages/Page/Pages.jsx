
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './Pages.css'
import linearCategories from '../../helpers/linearCategories';
import { useSelector, useDispatch } from 'react-redux';
import { createPage, deletePageById } from '../../actions/index';
import moment from 'moment';
import { AiFillDelete } from 'react-icons/ai';
import  RitchTextEditor from "../../RichTextEditor/RitchTextEditor";


const Pages = () => {

  const dispatch = useDispatch();
  const page = useSelector(state => state.page);

 



 
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
      <div className='datatable'>
                <div className="datatableTitle">
                  Add New page
                  <Link to="/Pages/new" className="link">
                    Add New
                  </Link>
                </div>
                <section class="blogs" id="blogs">
 
<div className="box-container">

 {page?.pages?.length>0 && page?.pages?.map((item)=>(

     <div className="box">
     <img src={item?.banners} alt="" />
     <span      onClick={() => {
                        const pageId = {id:item._id}
                        console.log(pageId)
                        dispatch(deletePageById(pageId));
                      }}

      
      ><AiFillDelete/> </span>

      <div className="content">
         <div className="icons">
             <a href="#"> <i class="fas fa-user"></i> by {item.creator} </a>
             <a href="#"> <i class="fas fa-calendar"></i> {moment(item?.createdAt).fromNow()} </a>
         </div>
         <h3>{item?.title} </h3>
         <p>{item?.description} </p>
     </div>
 </div>
 ))}
   

    
</div>

</section>
         
            </div>

    </div>
  </div>

  )
}

export default Pages