import React, { Fragment, useState } from 'react'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import Backdrop from '@material-ui/core/Backdrop'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import './UserOptions.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const UserOptions = ({user}) => {
    const history=useHistory();
    const dispatch=useDispatch();
    const alert=useAlert();
    const [open, setOpen] = useState(false)

    const {cartItems} =useSelector((state) =>state.cart);
    const options=[
        { icon: <ListAltIcon/>,name:"Orders",func:orders},
        { icon: <PersonIcon/>,name:"Profile",func:account},
        { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cartItemsFunc},
        { icon: <ExitToAppIcon/>,name:"Logout",func:logoutUser},
    ]
    if(user.role === "admin"){
        options.unshift({icon: <DashboardIcon/>,name:"Dashboard",func:dashboard})
    }
    function dashboard(){
        history.push("/admin/dashboard");
    }
    function orders(){
        history.push("/orders");
    }
    function account(){
        history.push("/account");
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully!");
    }
    function cartItemsFunc(){
        history.push("/Cart");
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        ariaLabel='SpeedDial'
        onClose={()=> setOpen(false)}
        onOpen={()=> setOpen(true)}
        direction='down'
        open={open}
        style={{zIndex:"11"}}
        className="speedDial"
        icon={<img className="speedDialIcon" src={user.avatar.url ? user.avatar.url: "/Profile.png"} alt="Profile"/>}>
        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600 ? true:false}/>
        ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions