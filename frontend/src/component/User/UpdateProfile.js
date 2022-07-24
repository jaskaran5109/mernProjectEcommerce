import React, { Fragment,useState ,useEffect} from 'react'
import './UpdateProfile.css'
import { useHistory, useLocation} from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face'
import {useAlert} from 'react-alert'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors,loadUser,updateProfile} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
const UpdateProfile = () => {
    const dispatch=useDispatch();
    const history=useHistory();
    const alert = useAlert();
    const location=useLocation();

    const {user}=useSelector(state=>state.user)
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const {error,loading,isUpdated}=useSelector(state=>state.profile)


    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };
    
      const updateProfileDataChange = (e) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
      };
    
      const redirect = location.search ? location.search.split("=")[1] : "/account";
    
      useEffect(() => {

        if(user)
        {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          history.push(redirect);
        dispatch(loadUser())
        }

        dispatch({
            type:UPDATE_PROFILE_RESET
        })
      }, [dispatch, error, alert, history, isUpdated, redirect,user]);
    
    return (
        <Fragment>
            {loading ?<Loader/>:<Fragment>
            <MetaData title={`Update Profile`}/>
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
                </div>
            </div>
          </Fragment>}
        </Fragment>
  )
}

export default UpdateProfile