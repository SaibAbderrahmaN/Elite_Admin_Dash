import React,{useState} from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import {addGroup, deleteGroupById} from '../../actions/groupe'
import './Course.scss'


const Course = () => {
  const defaultMaterialTheme = createTheme();
  const dispatch = useDispatch();

  const GroupsColumns = [
    {  title: "actions", field:"productPictures[0].img ", render:(row)=> <div>  <img className="cellImg" src={row.productPictures[0].img} alt="avatar" /></div>},
    {  title: "title", field:"name", },
    {  title: "category", field:"category.name", },
    {  title: "actions", field:"_id", render:(row)=> <div className='cellAction'> <Link to={`teacher/:${row?._id}`}  className="viewButton">view</Link>{console.log(row)} 
    <Link className="deleteButton"
        onClick={() => {
          const payload = {
            ids: row._id,
          };
          dispatch(deleteGroupById(payload));
        }}
    
    
    >delete</Link></div>},
  
  
  ];

  const courses = useSelector((state)=>state.product.products)
  console.log(courses)
  const [data, setData] = useState(courses)

  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar/>
      <div className='datatable'>
                <div className="datatableTitle">
                  Add New courses
                  <Link to="/courses/new" className="link">
                    Add New
                  </Link>
                </div>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable columns={GroupsColumns} data={data} title="our Teachers"
                        options={{exportButton:true}}
                    />
                </ThemeProvider>
            </div>

    </div>
  </div>
  )
}

export default Course