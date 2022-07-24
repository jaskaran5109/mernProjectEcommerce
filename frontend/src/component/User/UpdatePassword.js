import React, { Fragment,useState ,useEffect} from 'react'
import './UpdatePassword.css'
import { useHistory, useLocation} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,updatePassword} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const UpdatePassword = () => {

    const dispatch=useDispatch();
    const history=useHistory();
    const alert = useAlert();
    const location=useLocation();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {error,loading,isUpdated}=useSelector(state=>state.profile)


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
      };
    
      
    
      const redirect = location.search ? location.search.split("=")[1] : "/account";
    
      useEffect(() => {

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          history.push(redirect);
          dispatch({
            type:UPDATE_PASSWORD_RESET
            })
        }

       
      }, [dispatch, error, alert, history, isUpdated, redirect]);

  return (
    <Fragment>
            {loading ?<Loader/>:<Fragment>
            <MetaData title={`Update Password`}/>
            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                <h2 className="updatePasswordHeading">Update Password</h2>
                <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                    <VpnKeyIcon />
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
                </div>
            </div>
          </Fragment>}
        </Fragment>
  )
}

export default UpdatePassword