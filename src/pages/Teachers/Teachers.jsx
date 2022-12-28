import React, { useState } from 'react'
import './Teachers.scss'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { deleteTeacherById } from '../../actions';


const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const Teachers = () => {
  const defaultMaterialTheme = createTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const GroupsColumns = [
    {  title: "TeacherPictures", field:"TeacherPictures", render:(row)=> <div>  <img className="cellImg" src={row.TeacherPictures} alt="avatar" /></div>},
    {  title: "firstName", field:"firstName", },
    {  title: "email", field:"email", },
    {  title: "category", field:"category.name",},
    {  title: "lastName", field:"lastName", },
    {  title: "actions", field:"_id", render:(row)=> <div className='cellAction'> <Link to={`teacher/:${row?._id}`}  className="viewButton">view</Link>{console.log(row)} 
    <Link className="deleteButton"
        onClick={() => {
          const TeacherId = {
            ids: row._id,
          };
          dispatch(deleteTeacherById(TeacherId));
        }}
    
    
    >delete</Link></div>},
  
  
  ];


  const Data = useSelector((state)=>state.Teachers.Teachers)

  const [data, setData] = useState(Data)
  

return (
  <div className="list">
  <Sidebar/>
  <div className="listContainer">
    <Navbar/>
    <div className='datatable'>
              <div className="datatableTitle">
                Add New Teacher
                <Link to="/teachers/new" className="link">
                  Add New
                </Link>
              </div>
              <ThemeProvider theme={defaultMaterialTheme}>
                  <MaterialTable columns={GroupsColumns} data={data} title="our Teachers"
                      options={{exportButton:true,actionsColumnIndex:-1,addRowPosition:"first"}}
                      editable={{
                        onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                          console.log(newRow)
                        }),
                        onRowDelete:selectedRow=>Promise((resolve,reject)=>{
                          console.log(selectedRow)
                        }),
                        onRowUpdate:updatedRow=>Promise((resolve,reject)=>{
                          console.log(updatedRow)
                        }),
                      }}
                     
                  />
              </ThemeProvider>
          </div>

  </div>
</div>

  )
}

export default Teachers