import axios from 'axios';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const Login = ({history, location}) => {
  const dataTemplate = {
    email: "",
    password: ""
  } 

  const [data, setData] = useState({...dataTemplate});
  const [errors, setErrors] = useState({...dataTemplate});

  let params = queryString.parse(location.search);

  useEffect(() => {
    //activate account
    if(params.token && params.id) {
      var config = {
        url: process.env.REACT_APP_SERVER_URL+"/auth/activate",
        method: "POST",
        headers: { 
          "content-type": "application/json"
        },
        data: {
          token: params.token,
          userId: params.id
        }
      };
      axios(config).then(response => {
        if(response.data.error) {
          // toast.error("Error in fetching data: "+ response.data.error.message, {autoClose: 5000});
          console.log(response.data.error.message);
        } else if(response.data.success) {
          console.log(response.data.success.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [params])

  const validatePassword = (password) => {
    let passErrors = [];
    if(password.length<6) {
      passErrors.push("Password should have atleast 6 characters.");
    }
    if (password.search(/[a-z]/i) < 0) {
      passErrors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
      passErrors.push("Your password must contain at least one digit."); 
    }

    if(passErrors.length > 0)
      errors.password = passErrors.join(";");
    else
      errors.password = "";
    setErrors({ ...errors });
  }

  let capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    if(name==="password") {
      validatePassword(value);
    }
    else if(!value) {
      setErrors({...errors, [name]: capitalizeFirstLetter(name)+" cannot be empty"});
    }
    else {
      setErrors({...errors, [name]: ""});
    }
    setData({ ...data, [name]: value });
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
      url: process.env.REACT_APP_SERVER_URL+"/auth/signin",
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config).then(response => {
      console.log(response);
      if(response.data.success) {
        let accessToken = response.data.success.accessToken;

        if(accessToken) {
          localStorage.setItem('accessToken', accessToken);
          toast.success("Login Successful", {autoClose: 5000});
          
          history.push("/home");
        }
      } else if(response.data.error){
        toast.error("Login Failed:"+ response.data.error.message, {autoClose: 5000});
      }
    }).catch(function (error) {
      toast.error("Login Failed:"+ error, {autoClose: 5000});
      // console.log(error);
    });
  }
  return ( 
    <>
      <h1 className="text-center text-primary mt-5">Login</h1>
      <hr/>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <div className="d-flex"><Link to={"/signup"} className="ml-auto"><u>Create an account</u></Link></div>
          <form>
            <div className="form-group">
              <label htmlFor="email" className="">Email address</label>
              <input name="email" type="email" className="form-control" onChange={handleChange}/>
              <span className="text-danger">{errors.email}</span>
            </div>
            <div className="form-group">
            <div className="d-flex">
                <label htmlFor="password">Password</label>
                <Link to={"/resetPassword"} className="ml-auto"><small><u>Forgot Password</u></small></Link>
              </div>
              <input name="password" type="password" className="form-control" onChange={handleChange}/>
              {
                errors.password.split(";").map(error => {
                  return <React.Fragment key={ Math.random() }><span className="text-danger">{ error }</span><br/></React.Fragment>
                })
              }
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!canSubmit()}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default Login;