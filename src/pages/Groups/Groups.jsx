import React, { useState } from 'react'
import './Teachers.scss'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import {addGroup, deleteGroupById} from '../../actions/groupe'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


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







const Groups = () => {
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
      {  title: "title", field:"name", },
      {  title: "category", field:"category.name", },
      {  title: "day", field: "day", },
      {  title: "start", field: "start", },
      {  title: "end", field: "end", },
      {  title: "price",field: "numberSeats", },
      {  title: "numberSeatsAvailable", field: "numberSeatsAvailable"},
      {  title: "actions", field:"_id", render:(row)=>
       <div className='cellAction'> 
       <a onClick={handleOpen}  className="viewButton">view</a>{console.log(row)} 
       <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:' 80% '}}>
        <Button onClick={handleClose}>Close </Button>
          <h2 id="child-modal-title">{row?.name} </h2>
          <h2 id="child-modal-title">{row?.category?.name} </h2>
          <p id="child-modal-description">
            {row?.description}
          </p>
        </Box>
      </Modal>

      <Link className="deleteButton"
          onClick={() => {
            const payload = {
              ids: row._id,
            };
            dispatch(deleteGroupById(payload));
          }}
      
      
      >delete</Link></div>},

    ];

    const Data = useSelector((state)=>state?.Groups?.groups)
    console.log(Data)
    const [data, setData] = useState(Data)
    

  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
      <div className='datatable'>
                <div className="datatableTitle">
                  Add New groupe
                  <Link to="/groupe/new" className="link">
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

export default Groups


/*
{  title: "actions", field:"_id", render:(row)=>
       <div className='cellAction'> 
       <a onClick={handleOpen}  className="viewButton">view</a>{console.log(row)} 
       <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:' 80% '}}>
        <Button onClick={handleClose}>Close </Button>
          <h2 id="child-modal-title">{row?.name} </h2>
          <h2 id="child-modal-title">{row?.category?.name} </h2>
          <p id="child-modal-description">
            {row?.description}
          </p>
        </Box>
      </Modal>

      <Link className="deleteButton"
          onClick={() => {
            const payload = {
              ids: row._id,
            };
            dispatch(deleteGroupById(payload));
          }}
      
      
      >delete</Link></div>},



*/