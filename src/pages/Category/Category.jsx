import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import {IoIosCheckboxOutline,IoIosCheckbox,IoIosArrowForward,IoIosArrowDown,IoIosAdd,IoIosTrash,IoIosCloudUpload} from 'react-icons/io'

import './Category.scss'
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions/index';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' ,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Category = () => {
  const category = useSelector(state => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [categoryHours, setCategoryHours] = useState(0);
  const [categoryLanguage, setCategoryLanguage] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [Img, setImg] = useState('')
  const [Up, setUp] = useState(false)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenUp = () => {
    updateCheckedAndExpandedCategories();
    setUp(true);
  };
  const HandleClose = () => {
    setOpen(false);
  }
  const Handleup = () => {
    setUp(false);
  }

  useEffect(() => {

      if (!category.loading) {
          setShow(false);
      }

  }, [category.loading]);




  const handleClose = () => {

      const form = { name: categoryName,hours:categoryHours,language:categoryLanguage,parentId:parentCategoryId,categoryImage:Img };

      if (categoryName === "") {
          alert('Category name is required');
          setShow(false);
          return;
      }

      dispatch(addCategory(form)).then(()=>setOpen(false));
      setCategoryName('');setCategoryHours(0);setCategoryLanguage('');setParentCategoryId('');setShow(false);
  }
  function  previewFile (file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
          setImg(reader.result)

      }


  }

  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
      let myCategories = [];
      for (let category of categories) {
          myCategories.push(
              {
                  label: category.name,
                  value: category._id,
                  children: category.children.length > 0 && renderCategories(category.children)
              }
          );
      }
      return myCategories;
  }

  const createCategoryList = (categories, options = []) => {

      for (let category of categories) {
          options.push({value: category._id,name: category.name,parentId: category.parentId,type: category.type});
          if (category.children.length > 0) {createCategoryList(category.children, options)}
      }

      return options;
  }

  const handleCategoryImage = (e) => {
      setCategoryImage(previewFile(e.target.files[0]));

      
  }

  const updateCategory = () => {
      updateCheckedAndExpandedCategories();
      setUpdateCategoryModal(true);
  }

  const updateCheckedAndExpandedCategories = () => {
      const categories = createCategoryList(category.categories);
      const checkedArray = [];
      const expandedArray = [];
      checked.length > 0 && checked.forEach((categoryId, index) => {
          const category = categories.find((category, _index) => categoryId === category.value);
          category && checkedArray.push(category);
      })
      expanded.length > 0 && expanded.forEach((categoryId, index) => {
          const category = categories.find((category, _index) => categoryId === category.value);
          category && expandedArray.push(category);
      })
      setCheckedArray(checkedArray);
      setExpandedArray(expandedArray);
  }

  const handleCategoryInput = (key, value, index, type) => {
      if (type === "checked") {
          const updatedCheckedArray = checkedArray.map((item, _index) =>
              index === _index ? { ...item, [key]: value } : item);
          setCheckedArray(updatedCheckedArray);
      } else if (type === "expanded") {
          const updatedExpandedArray = expandedArray.map((item, _index) =>
              index === _index ? { ...item, [key]: value } : item);
          setExpandedArray(updatedExpandedArray);
      }
  }

  const updateCategoriesForm = () => {
      const form = new FormData();

      expandedArray.forEach((item, index) => {
          form.append('_id', item.value);
          form.append('name', item.name);
          form.append('parentId', item.parentId ? item.parentId : "");
          form.append('type', item.type);
      });
      checkedArray.forEach((item, index) => {
          form.append('_id', item.value);
          form.append('name', item.name);
          form.append('parentId', item.parentId ? item.parentId : "");
          form.append('type', item.type);
      });
      dispatch(updateCategories(form)).then(()=>setUp(false));
      
  }

  const deleteCategory = () => {
      updateCheckedAndExpandedCategories();
      setDeleteCategoryModal(true);
  }

  const deleteCategories = () => {
      const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
      const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
      const idsArray = expandedIdsArray.concat(checkedIdsArray);

      if (checkedIdsArray.length > 0) {
          dispatch(deleteCategoriesAction(checkedIdsArray))
              .then(result => {
                  if (result) {
                      dispatch(getAllCategory())
                      setDeleteCategoryModal(false)
                  }
              });
      }

      setDeleteCategoryModal(false);


  }

 

  const categoryList = createCategoryList(category.categories);




    
  return (

    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className='datatable'>
                <div className="datatableTitle">
                    Add New category
                   <Link onClick={handleOpen} className="link">
                    Add New
                  </Link>
                </div>
                <div>
                <div>
                <div>
                    <div md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={deleteCategory}> <span>Delete</span></button>
                                <button onClick={handleOpenUp}> <span>Edit</span></button>
                            </div>

                        </div>

                    </div>
                </div>
                <div>
                    <div md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}

                        />
                    </div>
                </div>
            </div>

                </div>
             
            </div>

    </div>
    <Modal
        hideBackdrop
        open={open}
        onClose={HandleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:' 60% '}}>
        <Button onClick={HandleClose}>Close </Button>
          <Box>
                <Box className='addCategory'>
                    <input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                       <input
                        value={categoryHours}
                        placeholder={`Category Hours`}
                        onChange={(e) => setCategoryHours(e.target.value)}
                        className="form-control-sm"
                    />
                       <input
                        value={categoryLanguage}
                        placeholder={`Category Language`}
                        onChange={(e) => setCategoryLanguage(e.target.value)}
                        className="form-control-sm"
                    />
                </Box>
            </Box>


          <Box className='addCategory'>
                   <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>

                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            
            </Box>

            <Button style={{margin:'auto'}} onClick={handleClose} variant="outlined"> create</Button>

        </Box>
      </Modal>
      <Modal
        hideBackdrop
        open={Up}
        onClose={Handleup}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:' 60% '}}>
        <Button onClick={Handleup}>Close </Button>
     
                <Box className='addCategory'>
                    <h6>Expanded</h6>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Box key={index} style={{display:'flex' ,alignItems:"center",justifyContent:'space-between' ,width:'100%' ,border:'1px 0 solid black' ,padding : '1rem'}}>
                        <Box>
                            <input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            />
                        </Box>
                        <Box>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Box>
                        <Box>
                            <select
                                className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                            >
                                <option value="">Select Type</option>
                                <option value="Online">Online</option>
                                <option value="class">class</option>
                                <option value="page">page</option>
                            </select>
                        </Box>
                    </Box>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Box key={index} style={{display:'flex' ,alignItems:"center",justifyContent:'space-between' ,width:'100%' ,border:'1px 0 solid black' ,padding : '1rem'}}>
                        <Box>
                            <input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Box>
                        <Box>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Box>
                        <Box>
                            <select className="form-control" value={item.type} onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')} >
                                <option value="">Select Type</option>
                                <option value="online">online</option>
                                <option value="class">class</option>
                                <option value="page">Page</option>
                            </select>
                        </Box>
                    </Box>
                )
            }
        

          
                </Box>


               <Button style={{margin:'auto'}} onClick={updateCategoriesForm} variant="outlined"> upDate</Button>

        </Box>
      </Modal>



  </div>

  )
}

export default Category