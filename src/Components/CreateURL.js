import axios from 'axios';
import React, { useState } from 'react';
import withNav from './HOC/withNav';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure();

const CreateURL = ({history}) => {
  const [url, setURL] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    
    if(value==="") {
      setError("URL cannot be empty");
    }
    else {
      setError("");
    }
    setURL(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    var config = {
      method: 'post',
      url: process.env.REACT_APP_SERVER_URL+"/app/url",
      headers: { 
        'Content-Type': 'application/json',
        'access-token': accessToken
      },
      data: {
        longURL: url
      }
    };
    axios(config).then(response => {
      console.log(response);
      if(response.data.success) {
        toast.success( response.data.success.message, {autoClose: 5000});
        history.push("/home");
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
      <h1 className="text-center text-primary mt-5">Shorten URL</h1>
      <hr/>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input name="url" type="text" className="form-control" onChange={handleChange}/>
              <span className="text-danger">{error}</span>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!url}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default withNav(CreateURL);