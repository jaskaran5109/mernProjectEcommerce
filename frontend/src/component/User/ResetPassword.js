import React, { Fragment, useState ,useEffect} from 'react'
import './ResetPassword.css'
import { useHistory, useLocation} from 'react-router-dom'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,resetPassword} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
const ResetPassword = ({match}) => {
    const dispatch=useDispatch();
    const history=useHistory();
    const alert = useAlert();
    const location=useLocation();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {error,loading,success}=useSelector(state=>state.forgotPassword)


    const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password",password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(match.params.token,myForm));
      };
    
      
    
      const redirect = location.search ? location.search.split("=")[1] : "/login";
    
      useEffect(() => {

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          history.push(redirect);
          
        }

       
      }, [dispatch, error, alert, history, success, redirect]);

  return (
    <Fragment>
            {loading ?<Loader/>:<Fragment>
            <MetaData title={`Reset Password`}/>
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Password</h2>
                <form
                className="resetPasswordForm"
                encType="multipart/form-data"
                onSubmit={resetPasswordSubmit}
              >
                
                <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
                </div>
            </div>
          </Fragment>}
        </Fragment>
  )
}

export default ResetPassword