import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    
    if(value==="") {
      setError("Email cannot be empty");
    }
    else {
      setError("");
    }
    setEmail(value);
    setFinalMessage("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var config = {
      method: 'post',
      url: process.env.REACT_APP_SERVER_URL+"/auth/resetPassword/"+email,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    axios(config).then(response => {
      console.log(response);
      if(response.data.success) {
        setFinalMessage("You will receive a link on your registered email. Click on it to reset your password");
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
      <h1 className="text-center text-primary mt-5">Reset your password</h1>
      <hr/>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <div className="d-flex flex-row-reverse">
            <Link to={"/login"} className="btn btn-primary">Login</Link>
            <Link to={"/signup"} className="btn btn-primary">Signup</Link>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="email" className="">Email address</label>
              <input name="email" type="email" className="form-control" onChange={handleChange}/>
              <span className="text-danger">{error}</span>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!email}>Submit</button>
            <hr/>
            <p className="text-success">{finalMessage}</p>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default ResetPassword;