import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure();

const EditURL = ({history}) => {

  const params = useParams();
  const url_id = params.id;   //get user id from from URL params
  console.log("id", url_id);
  const [longURL, setLongURL] = useState(null);
  const [shortURL, setShortURL] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // get user data from server
    let accessToken = localStorage.getItem("accessToken");

    let config = {
      url: process.env.REACT_APP_SERVER_URL+"/app/get/"+url_id,
      method: "GET",
      headers: {
        "content-type": "application/json",
        'access-token': accessToken
      }
    }
    axios(config).then(response => {
      let data = response.data;
      setLongURL(data.longURL);
      setShortURL(data.shortURL);
    }).catch(error => {
      console.log(error);
    });
  }, [url_id]);  

  const handleChange = (e) => {
    let value = e.target.value;
    
    if(value==="") {
      setError("URL cannot be empty");
    }
    else {
      setError("");
    }
    setLongURL(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem("accessToken");
    var config = {
      method: 'PUT',
      url: process.env.REACT_APP_SERVER_URL+"/app/url/"+url_id,
      headers: { 
        'Content-Type': 'application/json',
        'access-token': accessToken
      },
      data: {
        longURL
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
    {console.log(shortURL + ";" + longURL)}
      <h1 className="text-center text-primary mt-5">Edit</h1>
      <hr/>
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="longURL">Long URL</label>
              <input name="longURL" type="text" className="form-control" onChange={handleChange} value={longURL}/>
              <span className="text-danger">{error}</span>
            </div>
            <div className="form-group">
              <label htmlFor="short">Short URL</label>
              <input name="shortURL" type="text" className="form-control" readOnly value={shortURL}/>
              <span className="text-danger">{error}</span>
            </div>
            <button type="submit" className="btn btn-primary" onClick={ handleSubmit } disabled={!longURL}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
 
export default EditURL;