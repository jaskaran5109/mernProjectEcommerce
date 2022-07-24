import React, { Fragment, useState ,useEffect} from 'react'
import './ForgotPassword.css'
import { useHistory} from 'react-router-dom'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,forgotPassword} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const ForgotPassword = () => {

    const dispatch=useDispatch();
    const history=useHistory();
    const alert = useAlert();
    const [email, setEmail] = useState("")

    const {error,loading,message}=useSelector(state=>state.forgotPassword)
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
       if(message) {
        alert.success(message);
       }

        dispatch({
            type:UPDATE_PROFILE_RESET
        })
      }, [dispatch, error, alert, history, message]);
    
  return (
    <Fragment>
            {loading ?<Loader/>:<Fragment>
            <MetaData title={`Forgot Password`}/>
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                <h2 className="forgotPasswordHeading">Forgot Password</h2>
                <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
               
                <div className="forgotPasswordEmail">
                  <MailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

               
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
                </div>
            </div>
          </Fragment>}
        </Fragment>
  )
}

export default ForgotPassword