import React, { useState } from 'react'
import './Orders.scss'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import {useDispatch ,useSelector} from 'react-redux'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { compareAsc, format } from 'date-fns'


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

const Orders = () => {
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
      {  title: "fullName ", field:"fullName", },
      {  title: "PhoneNumber", field:"PhoneNumber", },
      {  title: "email", field: "email", },
      {  title: "Group", field: "Group.name", },
      {  title: "day", field: "Group.day", },
      {  title: "price", field: "Group.numberSeats", },
      {  title: "N-Seats", field: "Group.numberSeatsAvailable", },
      {  title: "createdAt", field:"createdAt",render:(row)=><div className='cellAction'> { format(new Date(row?.updatedAt), 'yyyy-MM-dd')} </div> }
    ];

    const Data = useSelector((state)=>state?.order?.orders)
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

export default Orders