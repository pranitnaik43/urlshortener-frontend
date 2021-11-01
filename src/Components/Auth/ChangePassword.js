import axios from 'axios';
import React, { useState } from 'react';
import queryString from 'query-string';
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ChangePassword = ({history, location}) => {

  const dataTemplate = {
    password: "",
    confirm_password: ""
  } 

  const [data, setData] = useState({...dataTemplate});
  const [errors, setErrors] = useState({...dataTemplate, passwordsNotSame:""});
  let params = queryString.parse(location.search);
  // console.log(params);

  const validatePassword = (name, value) => {
    let passErrors = [];
    if(value.length<6) {
      passErrors.push("Password should have atleast 6 characters.");
    }
    if (value.search(/[a-z]/i) < 0) {
      passErrors.push("Your password must contain at least one letter.");
    }
    if (value.search(/[0-9]/) < 0) {
      passErrors.push("Your password must contain at least one digit."); 
    }

    if(passErrors.length > 0)
      errors[name] = passErrors.join(";");
    else
      errors[name] = "";
    setErrors({ ...errors });
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validatePassword(name, value);
    setData({ ...data, [name]: value });
    console.log(data)
  }

  const samePass = (e) => {
    //Password and confirm-password should be same
    let confirm_password = e.target.value
    if(data.password!==confirm_password) {
      errors.passwordsNotSame="Should be same as Password";
    } else {
      errors.passwordsNotSame="";
    }
    setErrors({ ...errors });
  }

  const canSubmit = () => {
    var flag = true;
    Object.keys(data).forEach(key => {
      if(data[key]==="")
        flag = false;
    });
    Object.keys(errors).forEach(key => {
      if(errors[key]!=="")
        flag = false;
    });
    return flag;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var config = {
      method: 'post',
      url: process.env.REACT_APP_SERVER_URL+"/auth/changePassword",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {...data, userId: params.id, token: params.token}
    };
    axios(config).then(response => {
      console.log(response);
      if(response.data.success) {
        toast.success("Password changed successfully", {autoClose: 5000});
        history.push("/login");
      } else if(response.data.error){
        toast.error("Failed:"+ response.data.error.message, {autoClose: 5000});
      }
    }).catch(function (error) {
      toast.error("Failed:"+ error, {autoClose: 5000});
      // console.log(error);
    });
  }

  return (
    <>
      <h1 className="text-center text-primary mt-5">Change Password</h1>
      <hr/>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <div className="d-flex flex-row-reverse">
            <Link to={"/login"} className="btn btn-primary">Login</Link>
            <Link to={"/signup"} className="btn btn-primary">Signup</Link>
          </div>
          <form>
            {/* New Password */}
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input name="password" type="password" className="form-control" onChange={handleChange}/>
              {
                errors.password.split(";").map(error => {
                  return <React.Fragment key={ Math.random() }><span className="text-danger">{ error }</span><br/></React.Fragment>
                })
              }
            </div>
            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input name="confirm_password" type="password" className="form-control" onChange={(e) => {handleChange(e); samePass(e);}}/>
              {
                errors.confirm_password.split(";").map(error => {
                  return <React.Fragment key={ Math.random() }><span className="text-danger">{ error }</span><br/></React.Fragment>
                })
              }
              <span className="text-danger">{ errors.passwordsNotSame }</span><br/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!canSubmit()}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default ChangePassword;